import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

function normalizeHtml(html: string): string {
  const raw = (html ?? '').toString();
  if (!raw) return '';

  // Treat "empty editor" artifacts as empty.
  const div = document.createElement('div');
  div.innerHTML = raw;
  const hasMedia = div.querySelector('img,video,iframe') !== null;
  const text = (div.textContent ?? '').replace(/\u00A0/g, ' ').trim();

  if (!hasMedia && text === '') return '';
  return raw.trim();
}

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true,
    },
  ],
})
export class RichTextEditorComponent implements ControlValueAccessor {
  @Input() placeholder = 'Write…';

  @ViewChild('editable', { static: true })
  private editableRef!: ElementRef<HTMLDivElement>;

  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    const html = normalizeHtml(typeof value === 'string' ? value : '');
    const el = this.editableRef?.nativeElement;
    if (!el) return;
    el.innerHTML = html;
    if (html === '') {
      // Keep truly empty so CSS placeholder can show.
      el.textContent = '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(): void {
    const el = this.editableRef.nativeElement;
    const normalized = normalizeHtml(el.innerHTML);
    if (normalized === '') {
      // Force empty state (remove <br>, etc)
      el.textContent = '';
    }
    this.onChange(normalized);
  }

  onBlur(): void {
    this.onTouched();
  }

  private focus(): void {
    const el = this.editableRef?.nativeElement;
    if (!el) return;
    el.focus();
  }

  cmd(command: string, value?: string): void {
    if (this.disabled) return;
    this.focus();
    // execCommand is deprecated but still broadly supported and good enough for a lightweight CMS.
    // eslint-disable-next-line deprecation/deprecation
    document.execCommand(command, false, value);
    this.onInput();
  }

  block(tag: 'P' | 'H3' | 'H4' | 'BLOCKQUOTE'): void {
    if (this.disabled) return;
    this.focus();
    // eslint-disable-next-line deprecation/deprecation
    document.execCommand('formatBlock', false, tag);
    this.onInput();
  }

  link(): void {
    if (this.disabled) return;
    const url = window.prompt('Link URL (https://...)');
    if (!url) return;
    this.cmd('createLink', url);
  }
}

