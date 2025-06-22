import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { SelectComponent } from '../../component/select.component';

/**
 * Multiple Select Directive
 *
 * Enhances the SelectComponent with multiple selection functionality.
 * This directive separates the multi-select behavior from the base SelectComponent.
 */
@Directive({
  selector: 'ds-select[dsMultipleSelect]',
  standalone: true,
  exportAs: 'dsMultipleSelect',
  host: {
    class: 'ds-multiple-select',
    '[attr.data-multiple-select]': 'true', // Mark element for CSS targeting
  },
})
export class MultipleSelectDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private selectComponent = inject(SelectComponent);
  private elementRef = inject(ElementRef<HTMLElement>);

  // Input signals
  closeOnSelect = input<boolean>(false);
  maxSelections = input<number | undefined>(undefined);
  constructor() {
    // Setup the directive
    effect(() => {
      // Watch for value changes and enforce max selections
      const currentValue = this.selectComponent.value();
      const max = this.maxSelections();

      if (max && Array.isArray(currentValue) && currentValue.length > max) {
        // Limit to maximum allowed selections
        this.selectComponent.value.update((val) => {
          if (Array.isArray(val)) {
            return val.slice(0, max);
          }
          return val;
        });
      }

      // If max is defined, add it as a data attribute for styling
      if (max) {
        this.elementRef.nativeElement.setAttribute(
          'data-max-selections',
          max.toString()
        );
      } else {
        this.elementRef.nativeElement.removeAttribute('data-max-selections');
      }
    });
  }

  /**
   * When this directive is initialized:
   * - Verify that multiple mode is enabled
   * - Listen to closed events to implement stay-open behavior
   */
  ngOnInit(): void {
    // Check if multiple mode is enabled, and log a warning if not
    if (!this.selectComponent.multiple()) {
      console.warn(
        'dsMultipleSelect directive applied, but [multiple] input is set to false. Set [multiple]="true" on the select component for proper functionality.'
      );
    }

    // Listen for closed events if we need to reopen the dropdown
    if (!this.closeOnSelect()) {
      this.listenForOptionClickEvents();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Listen to option click events and handle dropdown behavior
   * When closeOnSelect is false, ensure the dropdown stays open after selection
   */
  private listenForOptionClickEvents(): void {
    // Find the dropdown element
    setTimeout(() => {
      const dropdown = this.elementRef.nativeElement.querySelector(
        '.ds-select__dropdown'
      );

      if (dropdown) {
        // Listen for clicks on any option
        fromEvent<MouseEvent>(dropdown, 'click')
          .pipe(takeUntil(this.destroy$))
          .subscribe((event) => {
            const target = event.target as HTMLElement;
            // Check if the click is on an option or inside an option
            const isOptionClick = target.closest('.ds-select__option');

            if (isOptionClick && !this.closeOnSelect()) {
              // This prevents the dropdown from closing
              event.stopPropagation();

              // Use the exported methods from SelectComponent
              setTimeout(() => {
                // If for some reason dropdown was closed, reopen it
                if (!this.selectComponent.isDropdownOpen()) {
                  this.selectComponent.openDropdown();
                }
              });
            }
          });
      }
    });
  }
}
