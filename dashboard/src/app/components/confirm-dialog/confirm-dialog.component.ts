import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (open) {
      <div class="overlay" role="presentation" (click)="onBackdropClick($event)">
        <div class="dialog" role="dialog" aria-modal="true" [attr.aria-label]="title || 'Confirmação'">
          <div class="title">{{ title || 'Confirmar' }}</div>
          <div class="message">{{ message }}</div>
          @if (hint) {
            <div class="hint">{{ hint }}</div>
          }
          <div class="actions">
            <button class="btn btn-secondary" type="button" (click)="cancel.emit()">
              {{ cancelText || 'Cancelar' }}
            </button>
            <button class="btn btn-danger" type="button" (click)="confirm.emit()">
              {{ confirmText || 'Excluir' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.55);
        display: grid;
        place-items: center;
        padding: 18px;
        z-index: 999;
      }

      .dialog {
        width: min(520px, 100%);
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
      }

      .title {
        font-weight: 900;
        color: var(--navy);
        font-size: 14px;
      }

      .message {
        color: var(--text);
        line-height: 1.4;
      }

      .hint {
        color: var(--danger-700);
        font-weight: 800;
        font-size: 12px;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 8px;
        border-top: 1px solid var(--border);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() message = '';
  @Input() hint = '';
  @Input() confirmText = 'Excluir';
  @Input() cancelText = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    // only close when clicking the backdrop itself
    if (event.target === event.currentTarget) this.cancel.emit();
  }
}

