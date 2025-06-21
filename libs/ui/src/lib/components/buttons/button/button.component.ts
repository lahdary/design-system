import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button variants
 * @property primary - Primary action button
 * @property secondary - Secondary action button
 * @property tertiary - Tertiary action button (low emphasis)
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Button sizes
 * @property sm - Small button
 * @property md - Medium button (default)
 * @property lg - Large button
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component
 * 
 * A versatile button component that supports different variants, sizes, and states.
 * 
 * @example
 * ```html
 * <ds-button variant="primary" size="md">Click Me</ds-button>
 * <ds-button variant="secondary" [disabled]="true">Disabled</ds-button>
 * <ds-button variant="tertiary" (click)="handleAction()">Tertiary Button</ds-button>
 * ```
 */
@Component({
  selector: 'ds-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  /**
   * Button variant
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';
  
  /**
   * Button size
   * @default 'md'
   */
  @Input() size: ButtonSize = 'md';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  @Input() disabled = false;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  @Input() loading = false;
  
  /**
   * Whether the button should take full width of container
   * @default false
   */
  @Input() fullWidth = false;
  
  /**
   * ARIA label for the button
   */
  @Input() ariaLabel?: string;
  
  /**
   * Button type attribute
   * @default 'button'
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  /**
   * Click event emitter
   */
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  /**
   * Signal that tracks whether the button is currently pressed
   */
  pressed = signal(false);
  
  /**
   * Handles button click and emits the clicked event
   * @param event - Mouse event
   */
  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
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
