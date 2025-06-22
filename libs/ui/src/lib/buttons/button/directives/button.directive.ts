import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import { ButtonSize, ButtonVariant, ButtonType } from '../button.types';

/**
 * Button directive
 *
 * A directive that transforms a regular button into a design system button.
 * Uses modern Angular signals API for reactive state management.
 *
 * @example
 * ```html
 * <button ds-ui-button>Click Me</button>
 * <button ds-ui-button variant="secondary">Secondary Button</button>
 * <button ds-ui-button [disabled]="true">Disabled Button</button>
 * ```
 */
@Directive({
  selector: '[ds-ui-button]',
  standalone: true,
})
export class ButtonDirective implements OnInit {
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
   * Computed classes for variant
   * Automatically updates when variant changes
   */
  private variantClass = computed(() => `ds-button--${this.variant()}`);

  /**
   * Computed classes for size
   * Automatically updates when size changes
   */
  private sizeClass = computed(() => `ds-button--${this.size()}`);

  /**
   * Computed class for fullWidth
   */
  private fullWidthClass = computed(() =>
    this.fullWidth() ? 'ds-button--full-width' : ''
  );

  /**
   * Computed loading state class
   */
  private loadingClass = computed(() =>
    this.loading() ? 'ds-button--loading' : ''
  );

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Set up effects to react to state changes
    effect(() => {
      this.updateButtonType();
      this.updateDisabledState();
      this.updateAriaLabel();
      this.updateClasses();
    });
  }

  ngOnInit(): void {
    // Add base button class
    this.renderer.addClass(this.el.nativeElement, 'ds-button');

    // Set up click handler
    this.renderer.listen(
      this.el.nativeElement,
      'click',
      (event: MouseEvent) => {
        if (!this.disabled() && !this.loading()) {
          this.clicked.emit(event);
        } else {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    );
  }

  /**
   * Update button type attribute
   */
  private updateButtonType(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'type', this.type());
  }

  /**
   * Update button disabled state
   */
  private updateDisabledState(): void {
    const isDisabled = this.disabled() || this.loading();

    if (isDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');
      this.renderer.addClass(this.el.nativeElement, 'ds-button--disabled');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      this.renderer.removeClass(this.el.nativeElement, 'ds-button--disabled');
    }
  }

  /**
   * Update button ARIA label
   */
  private updateAriaLabel(): void {
    const label = this.ariaLabel();
    if (label) {
      this.renderer.setAttribute(this.el.nativeElement, 'aria-label', label);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'aria-label');
    }
  }

  /**
   * Update button classes based on current state
   */
  private updateClasses(): void {
    // Remove all variant classes first
    const variantClasses = [
      'ds-button--primary',
      'ds-button--secondary',
      'ds-button--tertiary',
    ];
    variantClasses.forEach((cls) => {
      this.renderer.removeClass(this.el.nativeElement, cls);
    });

    // Remove all size classes first
    const sizeClasses = ['ds-button--sm', 'ds-button--md', 'ds-button--lg'];
    sizeClasses.forEach((cls) => {
      this.renderer.removeClass(this.el.nativeElement, cls);
    });

    // Add current variant class
    this.renderer.addClass(this.el.nativeElement, this.variantClass());

    // Add current size class
    this.renderer.addClass(this.el.nativeElement, this.sizeClass());

    // Handle fullWidth class
    if (this.fullWidth()) {
      this.renderer.addClass(this.el.nativeElement, 'ds-button--full-width');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'ds-button--full-width');
    }

    // Handle loading state
    if (this.loading()) {
      this.renderer.addClass(this.el.nativeElement, 'ds-button--loading');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'ds-button--loading');
    }
  }
}
