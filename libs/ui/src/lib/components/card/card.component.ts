import { Component, ChangeDetectionStrategy, input, contentChild, contentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card elevation levels
 * @property 0 - Flat card (no elevation)
 * @property 1 - Low elevation
 * @property 2 - Medium elevation (default)
 * @property 3 - High elevation
 */
export type CardElevation = 0 | 1 | 2 | 3;

/**
 * Card border radius variations
 * @property 'none' - No border radius
 * @property 'sm' - Small border radius
 * @property 'md' - Medium border radius (default)
 * @property 'lg' - Large border radius
 * @property 'full' - Fully rounded corners
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * Card component
 * 
 * A versatile card component with support for header, body and footer sections,
 * as well as various visual customizations.
 * 
 * @example
 * ```html
 * <ds-ui-card elevation="2" padding="md">
 *   <ds-ui-card-header>
 *     <h3>Card Title</h3>
 *   </ds-ui-card-header>
 *   <ds-ui-card-body>
 *     Card content goes here
 *   </ds-ui-card-body>
 *   <ds-ui-card-footer>
 *     <ds-ui-button>Action</ds-ui-button>
 *   </ds-ui-card-footer>
 * </ds-ui-card>
 * ```
 */
@Component({
  selector: 'ds-ui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  /**
   * Card elevation level
   * @default 2
   */
  readonly elevation = input<CardElevation>(2);
  
  /**
   * Card border radius
   * @default 'md'
   */
  readonly radius = input<CardRadius>('md');
  
  /**
   * Padding level for the card
   * Affects the internal spacing of the card
   * @default 'md'
   */
  readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  
  /**
   * Whether the card has a border
   * @default false
   */
  readonly bordered = input<boolean>(false);
  
  /**
   * Whether the card is interactive (has hover effects)
   * @default false
   */
  readonly interactive = input<boolean>(false);
  
  /**
   * Whether to display the card with full width
   * @default false
   */
  readonly fullWidth = input<boolean>(false);
}

/**
 * Card Header component
 * 
 * Container for the header section of the card
 */
@Component({
  selector: 'ds-ui-card-header',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      padding: var(--spacing-4);
      border-bottom: 1px solid var(--color-border);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent {}

/**
 * Card Body component
 * 
 * Container for the main content of the card
 */
@Component({
  selector: 'ds-ui-card-body',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      padding: var(--spacing-4);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardBodyComponent {}

/**
 * Card Footer component
 * 
 * Container for the footer section of the card
 */
@Component({
  selector: 'ds-ui-card-footer',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      padding: var(--spacing-4);
      border-top: 1px solid var(--color-border);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent {}
