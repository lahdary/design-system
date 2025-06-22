import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  computed,
  input,
  signal,
} from '@angular/core';
import { SortDirection, SortEvent } from '../table.types';

/**
 * Sortable Header Cell directive
 *
 * Extends the table header cell with sorting functionality.
 *
 * @example
 * ```html
 * <th ds-table-header-cell ds-sortable="name" (sort)="onSort($event)">Name</th>
 * ```
 */
@Directive({
  selector: 'th[ds-table-header-cell][ds-sortable]',
  standalone: true,
  host: {
    '[class.ds-table__header-cell--sortable]': 'true',
    '[class.ds-table__header-cell--sorted-asc]': 'direction() === "asc"',
    '[class.ds-table__header-cell--sorted-desc]': 'direction() === "desc"',
    '[attr.aria-sort]': 'ariaSortValue()',
  },
})
export class SortableHeaderDirective implements OnInit {
  /**
   * The ID of the column to be used for sorting
   */
  columnId = input.required<string>({ alias: 'ds-sortable' });

  /**
   * The current sort direction
   * @default 'none'
   */
  direction = signal<SortDirection>('none');

  /**
   * Emits when the sort direction changes
   */
  @Output() sort = new EventEmitter<SortEvent>();

  /**
   * ARIA sort attribute value
   */
  protected ariaSortValue = computed(() => {
    const currentDirection = this.direction();
    if (currentDirection === 'asc') return 'ascending';
    if (currentDirection === 'desc') return 'descending';
    return 'none';
  });

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'role',
      'columnheader'
    );
    this.renderer.setAttribute(this.elementRef.nativeElement, 'scope', 'col');
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-label',
      `${this.elementRef.nativeElement.textContent.trim()}, sortable column`
    );
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');

    // Add sort indicator elements
    const container = this.renderer.createElement('span');
    this.renderer.addClass(container, 'ds-table__sort-indicator');
    this.renderer.appendChild(this.elementRef.nativeElement, container);
  }

  /**
   * Handle click event to toggle sort direction
   */
  @HostListener('click')
  onClick(): void {
    // Rotate through sort directions: none -> asc -> desc -> none
    const currentDirection = this.direction();
    let newDirection: SortDirection = 'none';

    if (currentDirection === 'none') {
      newDirection = 'asc';
    } else if (currentDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = 'none';
    }

    this.direction.set(newDirection);
    this.sort.emit({ columnId: this.columnId(), direction: newDirection });
  }
}
