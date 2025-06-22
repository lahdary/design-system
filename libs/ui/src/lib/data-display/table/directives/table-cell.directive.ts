import {
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  input,
} from '@angular/core';

/**
 * Table Cell directive
 *
 * A directive for styling td elements within a design system table.
 *
 * @example
 * ```html
 * <table ds-table>
 *   <tbody ds-table-body>
 *     <tr ds-table-row>
 *       <td ds-table-cell>Cell content</td>
 *     </tr>
 *   </tbody>
 * </table>
 * ```
 */
@Directive({
  selector: 'td[ds-table-cell]',
  standalone: true,
  host: {
    class: 'ds-table__cell',
  },
})
export class TableCellDirective implements OnInit {
  /**
   * Cell alignment
   * @default 'left'
   */
  align = input<'left' | 'center' | 'right'>('left');

  @HostBinding('class.ds-table__cell--left')
  get isLeftAligned(): boolean {
    return this.align() === 'left';
  }

  @HostBinding('class.ds-table__cell--center')
  get isCenterAligned(): boolean {
    return this.align() === 'center';
  }

  @HostBinding('class.ds-table__cell--right')
  get isRightAligned(): boolean {
    return this.align() === 'right';
  }

  @HostBinding('attr.align')
  get alignAttribute(): string {
    return this.align();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'cell');
  }
}
