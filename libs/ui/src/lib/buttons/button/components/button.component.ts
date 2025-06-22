import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from '../button.types';

/**
 * Button component
 *
 * A versatile button component that supports different variants, sizes, and states.
 *
 * @example
 * ```html
 * <ds-ui-button variant="primary" size="md">Click Me</ds-ui-button>
 * <ds-ui-button variant="secondary" [disabled]="true">Disabled</ds-ui-button>
 * <ds-ui-button variant="tertiary" (click)="handleAction()">Tertiary Button</ds-ui-button>
 * ```
 */
@Component({
  selector: 'ds-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /**
   * Button variant
   * @default 'primary'
   */
  variant = input<ButtonVariant>('primary');

  /**
   * Button size
   * @default 'md'
   */
  size = input<ButtonSize>('md');

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading = input<boolean>(false);

  /**
   * Whether the button should take full width of container
   * @default false
   */
  fullWidth = input<boolean>(false);

  /**
   * ARIA label for the button
   */
  ariaLabel = input<string>('');

  /**
   * Button type attribute
   * @default 'button'
   */
  type = input<ButtonType>('button');

  /**
   * Click event emitter
   */
  clicked = output<MouseEvent>();

  /**
   * Signal that tracks whether the button is currently pressed
   */
  pressed = signal(false);

  /**
   * Handles button click and emits the clicked event
   * @param event - Mouse event
   */
  onClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }

  /**
   * Handle mouse down event
   */
  onMouseDown(): void {
    this.pressed.set(true);
  }

  /**
   * Handle mouse up event
   */
  onMouseUp(): void {
    this.pressed.set(false);
  }
}
