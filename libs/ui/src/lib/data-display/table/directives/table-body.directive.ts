import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/**
 * Table Body directive
 *
 * A directive for styling the tbody element within a design system table.
 *
 * @example
 * ```html
 * <table ds-table>
 *   <tbody ds-table-body>...</tbody>
 * </table>
 * ```
 */
@Directive({
  selector: 'tbody[ds-table-body]',
  standalone: true,
  host: {
    class: 'ds-table__body',
  },
})
export class TableBodyDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'role',
      'rowgroup'
    );
  }
}
