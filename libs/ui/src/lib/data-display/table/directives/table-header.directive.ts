import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/**
 * Table Header directive
 *
 * A directive for styling the thead element within a design system table.
 *
 * @example
 * ```html
 * <table ds-table>
 *   <thead ds-table-header>...</thead>
 * </table>
 * ```
 */
@Directive({
  selector: 'thead[ds-table-header]',
  standalone: true,
  host: {
    class: 'ds-table__header',
  },
})
export class TableHeaderDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'role',
      'rowgroup'
    );
  }
}
