import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  computed,
  input,
} from '@angular/core';
import { TableBorderStyle, TableDensity, TableSize } from '../table.types';

/**
 * Table directive
 *
 * A directive that transforms a regular HTML table into a design system table.
 * Uses modern Angular signals API for reactive state management.
 *
 * @example
 * ```html
 * <table ds-table>...</table>
 * <table ds-table size="sm" density="compact">...</table>
 * <table ds-table border="all" [striped]="true">...</table>
 * ```
 */
@Directive({
  selector: 'table[ds-table]',
  standalone: true,
  host: {
    class: 'ds-table',
    '[class.ds-table--sm]': 'sizeClasses().sm',
    '[class.ds-table--md]': 'sizeClasses().md',
    '[class.ds-table--lg]': 'sizeClasses().lg',
    '[class.ds-table--compact]': 'densityClasses().compact',
    '[class.ds-table--default]': 'densityClasses().default',
    '[class.ds-table--spacious]': 'densityClasses().spacious',
    '[class.ds-table--border-none]': 'borderClasses().none',
    '[class.ds-table--border-horizontal]': 'borderClasses().horizontal',
    '[class.ds-table--border-vertical]': 'borderClasses().vertical',
    '[class.ds-table--border-all]': 'borderClasses().all',
    '[class.ds-table--striped]': 'striped()',
    '[class.ds-table--hover]': 'hover()',
  },
})
export class TableDirective implements OnInit {
  /**
   * Table size
   * @default 'md'
   */
  size = input<TableSize>('md');

  /**
   * Table density
   * @default 'default'
   */
  density = input<TableDensity>('default');

  /**
   * Border style
   * @default 'horizontal'
   */
  border = input<TableBorderStyle>('horizontal');

  /**
   * Whether the table has striped rows
   * @default false
   */
  striped = input<boolean>(false);

  /**
   * Whether table rows have hover effects
   * @default true
   */
  hover = input<boolean>(true);

  /**
   * Computed size classes
   */
  protected sizeClasses = computed(() => {
    const currentSize = this.size();
    return {
      sm: currentSize === 'sm',
      md: currentSize === 'md',
      lg: currentSize === 'lg',
    };
  });

  /**
   * Computed density classes
   */
  protected densityClasses = computed(() => {
    const currentDensity = this.density();
    return {
      compact: currentDensity === 'compact',
      default: currentDensity === 'default',
      spacious: currentDensity === 'spacious',
    };
  });

  /**
   * Computed border classes
   */
  protected borderClasses = computed(() => {
    const currentBorder = this.border();
    return {
      none: currentBorder === 'none',
      horizontal: currentBorder === 'horizontal',
      vertical: currentBorder === 'vertical',
      all: currentBorder === 'all',
    };
  });

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Add proper ARIA roles and accessibility attributes
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'table');
  }
}
