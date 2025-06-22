import {
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  input,
} from '@angular/core';

/**
 * Table Header Cell directive
 *
 * A directive for styling th elements within a design system table.
 *
 * @example
 * ```html
 * <table ds-table>
 *   <thead ds-table-header>
 *     <tr ds-table-row>
 *       <th ds-table-header-cell>Header</th>
 *     </tr>
 *   </thead>
 * </table>
 * ```
 */
@Directive({
  selector: 'th[ds-table-header-cell]',
  standalone: true,
  host: {
    class: 'ds-table__header-cell',
  },
})
export class TableHeaderCellDirective implements OnInit {
  /**
   * Header cell alignment
   * @default 'left'
   */
  align = input<'left' | 'center' | 'right'>('left');

  @HostBinding('class.ds-table__header-cell--left')
  get isLeftAligned(): boolean {
    return this.align() === 'left';
  }

  @HostBinding('class.ds-table__header-cell--center')
  get isCenterAligned(): boolean {
    return this.align() === 'center';
  }

  @HostBinding('class.ds-table__header-cell--right')
  get isRightAligned(): boolean {
    return this.align() === 'right';
  }

  @HostBinding('attr.align')
  get alignAttribute(): string {
    return this.align();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'role',
      'columnheader'
    );
    this.renderer.setAttribute(this.elementRef.nativeElement, 'scope', 'col');
  }
}
