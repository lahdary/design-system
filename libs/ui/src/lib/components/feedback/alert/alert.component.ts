import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Alert variants
 * @property info - Informational alert (default)
 * @property success - Success alert
 * @property warning - Warning alert
 * @property error - Error alert
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Alert component
 * 
 * A component for displaying alert messages with various styles and options.
 * 
 * @example
 * ```html
 * <ds-ui-alert 
 *   variant="success" 
 *   [dismissible]="true" 
 *   (closed)="onAlertClosed()">
 *   Operation completed successfully.
 * </ds-ui-alert>
 * ```
 */
@Component({
  selector: 'ds-ui-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  /**
   * Alert title (optional)
   */
  readonly title = input<string>('');
  
  /**
   * Alert variant which determines the color scheme
   * @default 'info'
   */
  readonly variant = input<AlertVariant>('info');
  
  /**
   * Whether the alert can be dismissed/closed by the user
   * @default false
   */
  readonly dismissible = input<boolean>(false);

  /**
   * Whether the alert has an icon
   * @default true
   */
  readonly hasIcon = input<boolean>(true);
  
  /**
   * Whether the alert has a border
   * @default true
   */
  readonly bordered = input<boolean>(true);
  
  /**
   * Whether the alert has a solid background
   * @default false
   */
  readonly solid = input<boolean>(false);
  
  /**
   * Whether the alert includes a subtle shadow
   * @default false
   */
  readonly elevated = input<boolean>(false);

  /**
   * Event emitted when alert is closed
   */
  readonly closed = output<void>();
  
  /**
   * Whether the alert is visible
   */
  readonly visible = signal(true);

  /**
   * Close the alert
   */
  closeAlert(): void {
    this.visible.set(false);
    this.closed.emit();
  }

  /**
   * Get the correct icon based on variant
   */
  get icon(): string {
    switch(this.variant()) {
      case 'info': return 'info';
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }
}
