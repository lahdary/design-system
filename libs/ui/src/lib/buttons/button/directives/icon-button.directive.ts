import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { ButtonSize, ButtonType, IconButtonColor } from '../button.types';

/**
 * Icon Button directive
 *
 * A directive that transforms a regular button into a circular icon button.
 * Designed for buttons that contain only an icon and no text.
 * Uses modern Angular signals API for reactive state management.
 *
 * @example
 * ```html
 * <button ds-ui-icon-button>
 *   <svg>...</svg>
 * </button>
 * <button ds-ui-icon-button color="secondary" size="lg">
 *   <i class="material-icons">add</i>
 * </button>
 * <button ds-ui-icon-button [disabled]="true">
 *   <span class="icon">+</span>
 * </button>
 * ```
 */
@Directive({
  selector: '[dsUiIconButton]',
  standalone: true,
})
export class IconButtonDirective implements OnInit {
  /**
   * Button color variant
   * @default 'primary'
   */
  color = input<IconButtonColor>('primary');

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
   * ARIA label for the button (required for accessibility)
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
   * Computed classes for color variant
   * Automatically updates when color changes
   */
  private colorClass = computed(() => `ds-icon-button--${this.color()}`);

  /**
   * Computed classes for size
   * Automatically updates when size changes
   */
  private sizeClass = computed(() => `ds-icon-button--${this.size()}`);

  /**
   * Computed loading state class
   */
  private loadingClass = computed(() =>
    this.loading() ? 'ds-icon-button--loading' : ''
  );
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  constructor() {
    // Set up effects to react to state changes
    effect(() => {
      this.updateButtonType();
      this.updateDisabledState();
      this.updateAriaLabel();
      this.updateClasses();
    });
  }

  ngOnInit(): void {
    // Add base button classes
    this.renderer.addClass(this.el.nativeElement, 'ds-button');
    this.renderer.addClass(this.el.nativeElement, 'ds-icon-button');

    // Ensure the button has an accessible name
    if (!this.ariaLabel()) {
      console.warn(
        'Icon buttons should have an aria-label attribute for accessibility'
      );
    }

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
      this.renderer.setAttribute(
        this.el.nativeElement,
        'aria-disabled',
        'true'
      );
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.el.nativeElement, 'aria-disabled');
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
    // Remove all color variant classes first
    const colorClasses = [
      'ds-icon-button--primary',
      'ds-icon-button--secondary',
      'ds-icon-button--tertiary',
    ];
    colorClasses.forEach((cls) => {
      this.renderer.removeClass(this.el.nativeElement, cls);
    });

    // Remove all size classes first
    const sizeClasses = [
      'ds-icon-button--sm',
      'ds-icon-button--md',
      'ds-icon-button--lg',
    ];
    sizeClasses.forEach((cls) => {
      this.renderer.removeClass(this.el.nativeElement, cls);
    });

    // Add current color variant class
    this.renderer.addClass(this.el.nativeElement, this.colorClass());

    // Add current size class
    this.renderer.addClass(this.el.nativeElement, this.sizeClass());

    // Handle loading state
    if (this.loading()) {
      this.renderer.addClass(this.el.nativeElement, 'ds-icon-button--loading');
    } else {
      this.renderer.removeClass(
        this.el.nativeElement,
        'ds-icon-button--loading'
      );
    }
  }
}
