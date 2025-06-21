import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  Input,
  input,
  output,
  Renderer2,
} from '@angular/core';

/**
 * Modal sizes
 * @property sm - Small modal
 * @property md - Medium modal (default)
 * @property lg - Large modal
 * @property full - Full screen modal
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Modal backdrop types
 * @property dimmed - Semi-transparent dark backdrop (default)
 * @property blur - Blurred backdrop
 * @property none - No visible backdrop
 */
export type BackdropType = 'dimmed' | 'blur' | 'none';

/**
 * Modal / Dialog component
 *
 * A component for displaying content in a layer above the app.
 *
 * @example
 * ```html
 * <ds-ui-modal
 *   [open]="isModalOpen"
 *   (closed)="handleModalClose()"
 *   title="Example Modal">
 *   <p>Modal content goes here...</p>
 *   <div slot="footer">
 *     <ds-ui-button (clicked)="isModalOpen = false">Close</ds-ui-button>
 *   </div>
 * </ds-ui-modal>
 * ```
 */
@Component({
  selector: 'ds-ui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  /**
   * Whether the modal is open
   * @default false
   */
  private _open = false;

  @Input() set open(value: boolean) {
    if (value) {
      this.openModal();
    } else {
      this.closeModal();
    }
    this._open = value;
  }

  get open(): boolean {
    return this._open;
  }

  /**
   * Title of the modal
   * @default ''
   */
  title = input<string>('');

  /**
   * Whether the modal can be closed by clicking the backdrop or escape key
   * @default true
   */
  closeOnOutsideClick = input<boolean>(true);

  /**
   * Whether the modal can be closed by pressing the escape key
   * @default true
   */
  closeOnEsc = input<boolean>(true);

  /**
   * Size of the modal
   * @default 'md'
   */
  size = input<ModalSize>('md');

  /**
   * Type of backdrop
   * @default 'dimmed'
   */
  backdropType = input<BackdropType>('dimmed');

  /**
   * Whether the modal has a close button in the header
   * @default true
   */
  showCloseButton = input<boolean>(true);

  /**
   * Whether the modal content has padding
   * @default true
   */
  contentPadding = input<boolean>(true);

  /**
   * Event emitted when the modal is closed
   */
  closed = output<void>();

  private destroyRef = inject(DestroyRef);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private originalOverflow = '';

  constructor() {
    this.trapFocus();
  }

  /**
   * Trap focus within the modal for accessibility
   */
  private trapFocus() {
    let firstFocusableEl: HTMLElement;
    let lastFocusableEl: HTMLElement;

    const checkFocusableElements = () => {
      if (this.open) {
        setTimeout(() => {
          const focusableElements =
            this.elementRef.nativeElement.querySelectorAll(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

          if (focusableElements.length) {
            firstFocusableEl = focusableElements[0] as HTMLElement;
            lastFocusableEl = focusableElements[
              focusableElements.length - 1
            ] as HTMLElement;
            firstFocusableEl.focus();
          }
        }, 100);
      }
    };

    this.elementRef.nativeElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (!this.open || event.key !== 'Tab') return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            event.preventDefault();
          }
        }
      }
    );

    // Run when modal is opened
    this.elementRef.nativeElement.addEventListener(
      'transitionend',
      checkFocusableElements
    );
  }

  /**
   * Handle closing the modal when escape key is pressed
   */
  @HostListener('document:keydown.escape')
  onEscapeKeydown() {
    if (this.open && this.closeOnEsc()) {
      this.close();
    }
  }

  /**
   * Open the modal
   */
  openModal(): void {
    this.originalOverflow = document.body.style.overflow;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.renderer.setStyle(document.body, 'overflow', this.originalOverflow);
  }

  /**
   * Close handler
   */
  close(): void {
    this.closed.emit();
  }

  /**
   * Handle backdrop click
   */
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnOutsideClick() && event.target === event.currentTarget) {
      this.close();
    }
  }
}
