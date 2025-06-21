import { Component, ChangeDetectionStrategy, computed, input, output, EventEmitter, signal, model, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Text Input size variants
 * @property sm - Small text input
 * @property md - Medium text input (default)
 * @property lg - Large text input
 */
export type TextInputSize = 'sm' | 'md' | 'lg';

/**
 * Text Input status variants
 * @property default - Default state
 * @property success - Success state
 * @property error - Error state
 * @property warning - Warning state
 */
export type TextInputStatus = 'default' | 'success' | 'error' | 'warning';

/**
 * Text Input component
 * 
 * A versatile text input component with different sizes, states and features.
 * 
 * @example
 * ```html
 * <ds-ui-text-input 
 *   placeholder="Enter your name" 
 *   [label]="'Full Name'"
 *   [required]="true">
 * </ds-ui-text-input>
 * ```
 */
@Component({
  selector: 'ds-ui-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent {
  // Private internal ID
  private _uniqueId = `ds-text-input-${Math.random().toString(36).substring(2, 11)}`;
  
  /**
   * Input ID - Auto-generated unique ID if not provided
   */
  readonly id = input<string>(this._uniqueId);

  /**
   * Input label to display above the input field
   */
  readonly label = input<string>('');

  /**
   * Input value, bindable for ngModel
   */
  readonly value = model<string>('');
  
  /**
   * Input placeholder text
   */
  readonly placeholder = input<string>('');
  
  /**
   * Input size variant
   * @default 'md'
   */
  readonly size = input<TextInputSize>('md');
  
  /**
   * Input status - Affects the visual styling to indicate validation state
   * @default 'default'
   */
  readonly status = input<TextInputStatus>('default');
  
  /**
   * Helper text displayed below the input
   */
  readonly helperText = input<string>('');
  
  /**
   * Error message to display when in error state
   */
  readonly errorMessage = input<string>('');
  
  /**
   * Whether the input is disabled
   */
  readonly disabled = input<boolean>(false);
  
  /**
   * Whether the input is required
   */
  readonly required = input<boolean>(false);
  
  /**
   * Whether the input is readonly
   */
  readonly readonly = input<boolean>(false);

  /**
   * Input type (text, password, email, etc)
   */
  readonly type = input<string>('text');
  
  /**
   * Max length for the input
   */
  readonly maxlength = input<number | null>(null);
  
  /**
   * Min length for the input
   */
  readonly minlength = input<number | null>(null);

  /**
   * Aria-label for accessibility
   */
  readonly ariaLabel = input<string | null>(null);

  /**
   * Whether the input is focused 
   */
  focused = signal<boolean>(false);
  
  /**
   * Whether the input has been touched
   */
  touched = signal<boolean>(false);

  /**
   * Whether the input is in error state
   * (computed from status or can be derived from validation)
   */
  hasError = computed(() => this.status() === 'error');
  
  /**
   * Event emitted when the input value changes
   */
  inputChange = output<string>();
  
  /**
   * Event emitted when the input field is blurred
   */
  inputBlur = output<FocusEvent>();
  
  /**
   * Event emitted when the input field is focused
   */
  inputFocus = output<FocusEvent>();

  /**
   * Computed class for the container element based on state
   */
  containerClass = computed(() => {
    return {
      'ds-text-input': true,
      'ds-text-input--focused': this.focused(),
      'ds-text-input--disabled': this.disabled(),
      'ds-text-input--readonly': this.readonly(),
      'ds-text-input--error': this.hasError(),
      'ds-text-input--success': this.status() === 'success',
      'ds-text-input--warning': this.status() === 'warning',
      [`ds-text-input--${this.size()}`]: true,
    };
  });

  /**
   * Handle input focus event
   */
  onFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.inputFocus.emit(event);
  }

  /**
   * Handle input blur event
   */
  onBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.touched.set(true);
    this.inputBlur.emit(event);
  }

  /**
   * Handle input change event
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputChange.emit(target.value);
  }
}
