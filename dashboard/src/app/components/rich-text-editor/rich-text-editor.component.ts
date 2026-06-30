import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AdminApiService } from '../../services/admin-api.service';

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
  private readonly api = inject(AdminApiService);

  @Input() placeholder = 'Write…';

  @ViewChild('editable', { static: true })
  private editableRef!: ElementRef<HTMLDivElement>;

  @ViewChild('imageInput')
  private imageInputRef?: ElementRef<HTMLInputElement>;

  disabled = false;
  readonly uploading = signal(false);

  private savedRange: Range | null = null;
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
    this.saveSelection();
    this.onTouched();
  }

  onSelectionChange(): void {
    this.saveSelection();
  }

  private saveSelection(): void {
    const sel = window.getSelection();
    const el = this.editableRef?.nativeElement;
    if (!sel || sel.rangeCount === 0 || !el) return;
    const range = sel.getRangeAt(0);
    if (el.contains(range.commonAncestorContainer)) {
      this.savedRange = range.cloneRange();
    }
  }

  private restoreSelection(): boolean {
    const el = this.editableRef?.nativeElement;
    if (!el || !this.savedRange) return false;
    el.focus();
    const sel = window.getSelection();
    if (!sel) return false;
    sel.removeAllRanges();
    sel.addRange(this.savedRange);
    return true;
  }

  pickImage(): void {
    if (this.disabled || this.uploading()) return;
    this.saveSelection();
    this.imageInputRef?.nativeElement?.click();
  }

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (input) input.value = '';
    if (!file) return;

    this.uploading.set(true);
    this.api.upload(file).subscribe({
      next: (res) => {
        this.uploading.set(false);
        this.insertImageAtCursor(res.url);
      },
      error: () => {
        this.uploading.set(false);
      },
    });
  }

  private insertImageAtCursor(url: string): void {
    if (this.disabled || !url) return;
    const el = this.editableRef?.nativeElement;
    if (!el) return;

    el.focus();
    if (!this.restoreSelection()) {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }

    // eslint-disable-next-line deprecation/deprecation
    document.execCommand('insertImage', false, url);
    this.onInput();
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

