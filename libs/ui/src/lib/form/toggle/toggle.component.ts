import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Toggle sizes
 * @property sm - Small toggle
 * @property md - Medium toggle (default)
 * @property lg - Large toggle
 */
export type ToggleSize = 'sm' | 'md' | 'lg';

/**
 * Toggle/Switch component
 * 
 * A component for toggling between two states, often used for settings or feature flags.
 * 
 * @example
 * ```html
 * <ds-ui-toggle [(checked)]="isEnabled" label="Enable feature"></ds-ui-toggle>
 * <ds-ui-toggle [disabled]="isProcessing" (checkedChange)="handleToggle($event)"></ds-ui-toggle>
 * ```
 */
@Component({
  selector: 'ds-ui-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  /**
   * Whether the toggle is checked
   * @default false
   */
  checked = input<boolean>(false);

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Whether the toggle is in a loading state
   * @default false
   */
  loading = input<boolean>(false);

  /**
   * Size of the toggle
   * @default 'md'
   */
  size = input<ToggleSize>('md');

  /**
   * Label for the toggle
   * @default ''
   */
  label = input<string>('');

  /**
   * Position of the label
   * @default 'right'
   */
  labelPosition = input<'left' | 'right'>('right');
  
  /**
   * Required attribute for the toggle
   * @default false
   */
  required = input<boolean>(false);

  /**
   * ID for the toggle input element
   * @default Automatically generated
   */
  id = input<string>(`ds-toggle-${Math.random().toString(36).substring(2, 11)}`);

  /**
   * ARIA label for the toggle
   */
  ariaLabel = input<string>('');

  /**
   * Event emitted when the checked state changes
   */
  checkedChange = output<boolean>();

  /**
   * Handler for the toggle change event
   */
  onToggleChange(): void {
    if (!this.disabled() && !this.loading()) {
      this.checkedChange.emit(!this.checked());
    }
  }
}
