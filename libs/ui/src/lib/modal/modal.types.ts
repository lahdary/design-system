/**
 * Modal types
 *
 * This file contains all type definitions related to modal service, configuration, and references.
 */
import { InjectionToken, signal } from '@angular/core';

// Re-export the types from the modal component for convenience
export type { BackdropType, ModalSize } from './modal.component';

/**
 * Configuration options for the modal
 */
export interface ModalConfig<D = any> {
  /**
   * Modal title
   * @default ''
   */
  title?: string;

  /**
   * Data to be injected into the modal content component
   * @default null
   */
  data?: D;

  /**
   * Whether the modal can be closed by clicking outside or pressing escape key
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether the modal can be closed by pressing the escape key
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Size of the modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * Type of backdrop
   * @default 'dimmed'
   */
  backdropType?: 'dimmed' | 'blur' | 'none';

  /**
   * Whether the modal has a close button in the header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Whether the modal content has padding
   * @default true
   */
  contentPadding?: boolean;

  /**
   * CSS classes to add to the modal container
   */
  panelClass?: string | string[];

  /**
   * Width of the modal (CSS value)
   */
  width?: string;

  /**
   * Height of the modal (CSS value)
   */
  height?: string;

  /**
   * Whether to restore focus to the element that had focus before the modal was opened
   * @default true
   */
  restoreFocus?: boolean;
}

/**
 * State of the modal
 */
export type ModalState = 'opening' | 'open' | 'closing' | 'closed';

/**
 * Reference to a modal opened via the ModalService
 */
export class ModalRef<T = any, R = any> {
  /**
   * Component instance inside the modal
   */
  componentInstance: T | null = null;

  /**
   * Current state of the modal
   */
  state = signal<ModalState>('closed');

  /**
   * Result returned when the modal is closed
   */
  private result: R | undefined;

  /**
   * Function to be called when the modal is closed
   */
  private afterClosedCallback: ((result: R | undefined) => void) | null = null;

  constructor(private modalId: string) {}

  /**
   * Close the modal with an optional result
   * @param result Optional data to return
   */
  close(result?: R): void {
    this.result = result;
    this.state.set('closing');

    // Notify subscribers that the modal is closing with the result
    if (this.afterClosedCallback) {
      this.afterClosedCallback(this.result);
    }
    // Note: The actual DOM cleanup is done by the ModalService
  }

  /**
   * Gets an observable that is notified when the modal is closed
   * @param callback Function to be called when the modal is closed
   */
  afterClosed(callback: (result: R | undefined) => void): void {
    this.afterClosedCallback = callback;
  }

  /**
   * Get the unique ID of this modal
   */
  getId(): string {
    return this.modalId;
  }
}

/**
 * Injection token to access modal data
 */
export const MODAL_DATA = new InjectionToken<any>('ModalData');

/**
 * Injection token to access the ModalRef instance
 */
export const MODAL_REF = new InjectionToken<ModalRef<any>>('ModalRef');

/**
 * Injection token for default modal configurations
 */
export const MODAL_DEFAULT_OPTIONS = new InjectionToken<ModalConfig>(
  'ModalDefaultOptions'
);
