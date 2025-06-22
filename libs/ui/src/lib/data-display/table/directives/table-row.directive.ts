import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/**
 * Table Row directive
 *
 * A directive for styling tr elements within a design system table.
 *
 * @example
 * ```html
 * <table ds-table>
 *   <tbody ds-table-body>
 *     <tr ds-table-row>...</tr>
 *   </tbody>
 * </table>
 * ```
 */
@Directive({
  selector: 'tr[ds-table-row]',
  standalone: true,
  host: {
    class: 'ds-table__row',
  },
})
export class TableRowDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'row');
  }
}
