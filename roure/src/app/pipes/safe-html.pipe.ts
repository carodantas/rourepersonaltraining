import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

function minimalSanitizeHtml(input: string): string {
  const html = (input ?? '').toString();
  if (!html) return '';

  // If DOMParser is available (browser), do a simple whitelist-ish cleanup.
  if (typeof window !== 'undefined' && typeof window.DOMParser !== 'undefined') {
    const doc = new window.DOMParser().parseFromString(html, 'text/html');

    // Remove dangerous elements.
    doc.querySelectorAll('script, style, iframe, object, embed').forEach((el) => el.remove());

    // Remove inline event handlers and JS URLs.
    doc.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = (attr.value ?? '').toString();

        if (name.startsWith('on')) el.removeAttribute(attr.name);
        if (name === 'style') el.removeAttribute(attr.name); // keep styling controlled by CSS

        if (name === 'href') {
          const v = value.trim().toLowerCase();
          if (v.startsWith('javascript:') || v.startsWith('data:')) {
            el.removeAttribute(attr.name);
          } else {
            // Harden links opened from CMS content
            (el as HTMLElement).setAttribute('rel', 'noopener noreferrer');
            (el as HTMLElement).setAttribute('target', '_blank');
          }
        }
      });
    });

    return doc.body.innerHTML;
  }

  // SSR fallback: strip the most dangerous patterns.
  return html
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, '')
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\shref\s*=\s*(['"])\s*javascript:[\s\S]*?\1/gi, '');
}

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    const cleaned = minimalSanitizeHtml(value ?? '');
    return this.sanitizer.bypassSecurityTrustHtml(cleaned);
  }
}

