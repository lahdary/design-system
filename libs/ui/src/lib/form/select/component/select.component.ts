import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SelectOption, SelectSize, SelectValue } from '../select.types';

/**
 * Select Component
 *
 * A dropdown component that allows users to select one or more options from a list.
 * Supports single and multiple selection, option grouping, and search functionality.
 */
@Component({
  selector: 'ds-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'ds-select-container',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
  },
})
export class SelectComponent implements OnInit, AfterContentInit, OnDestroy {
  // Reference to multiple select directive if applied
  @ContentChild('dsMultipleSelect') multipleSelectDirective?: {
    closeOnSelect: () => boolean;
  };
  // Element reference for DOM manipulation
  private elementRef = inject(ElementRef);

  // For cleanup on destroy
  private destroy$ = new Subject<void>();

  // Unique identifier for this select instance
  protected readonly id = `select-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  // ID for the dropdown element
  protected readonly dropdownId = `${this.id}-dropdown`;

  // Track mouse over dropdown for hover state
  protected mouseOverDropdown = signal<boolean>(false);

  // Input signals
  options = input<SelectOption[]>([]);
  value = model<SelectValue>(null);
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  error = input<string | null>(null);
  required = input<boolean>(false);
  multiple = input<boolean>(false);
  searchable = input<boolean>(false);
  size = input<SelectSize>('md');
  clearable = input<boolean>(false);

  // Accessibility inputs
  ariaLabel = input<string | undefined>(undefined);
  ariaLabelledby = input<string | undefined>(undefined);

  // Output signals
  opened = output<void>();
  closed = output<void>();
  search = output<string>();

  // Internal state management
  protected isOpen = signal<boolean>(false);
  protected searchText = signal<string>('');
  protected highlightedIndex = signal<number>(-1);

  // Computed values
  protected filteredOptions = computed(() => {
    const searchVal = this.searchText().toLowerCase().trim();
    if (!searchVal) {
      return this.options();
    }

    return this.options().filter(
      (option) =>
        option.label.toLowerCase().includes(searchVal) ||
        option.value.toLowerCase().includes(searchVal)
    );
  });

  // Display text for selected value
  protected displayValue = computed(() => {
    const val = this.value();

    if (val === null || val === undefined || val === '') {
      return '';
    }

    if (Array.isArray(val)) {
      const availableOptions = this.options();
      const selectedOptions = availableOptions.filter((o) =>
        val.includes(o.value)
      );
      return selectedOptions.map((o) => o.label).join(', ') || '';
    }

    // Single selection
    const availableOptions = this.options();
    const selectedOption = availableOptions.find((o) => o.value === val);
    return selectedOption?.label || val.toString();
  });

  // ID of the currently highlighted option for a11y
  protected highlightedOptionId = computed(() => {
    const index = this.highlightedIndex();
    if (index < 0 || !this.filteredOptions().length) return '';

    const option = this.filteredOptions()[index];
    return option ? `${this.id}-option-${option.value}` : '';
  });

  // Group options by their group property
  protected optionGroups = computed(() => {
    const options = this.filteredOptions();
    const groups: { [key: string]: SelectOption[] } = {};

    options.forEach((option) => {
      const groupName = option.group || '';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(option);
    });

    return Object.entries(groups);
  });
  constructor() {
    // Reset highlighted index and handle dropdown resize
    effect(() => {
      // When options change, reset the highlighted index
      this.filteredOptions();
      if (this.isOpen()) {
        this.highlightedIndex.set(0);
      } else {
        this.highlightedIndex.set(-1);
      }
    });
  }

  ngOnInit(): void {
    // Handle outside clicks to close the dropdown
    fromEvent<MouseEvent>(document, 'mousedown')
      .pipe(
        filter((event) => {
          const target = event.target as HTMLElement;
          // Only close if dropdown is open and click is outside the select
          return (
            this.isOpen() && !this.elementRef.nativeElement.contains(target)
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.closeDropdown();
      });
  }

  ngAfterContentInit(): void {
    // Check if multiple select directive is applied
    if (this.multipleSelectDirective) {
      console.log(
        'MultipleSelectDirective is applied to this select component'
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Toggle the dropdown open/closed
  protected toggleDropdown(event?: Event): void {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
      if (typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }
    }

    if (this.disabled() || this.loading()) {
      return;
    }

    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  // Open dropdown method has been moved above with enhanced access

  /**
   * Close the dropdown
   * Protected method, but accessible to directives applied to this component
   */
  closeDropdown(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.searchText.set('');
    this.highlightedIndex.set(-1);
    this.closed.emit();
  }

  /**
   * Open the dropdown
   * Protected method, but accessible to directives applied to this component
   */
  openDropdown(): void {
    if (this.disabled() || this.loading()) return;

    this.isOpen.set(true);
    this.highlightedIndex.set(0);
    this.opened.emit();

    // Focus search input if searchable
    if (this.searchable()) {
      setTimeout(() => {
        const searchInput = this.elementRef.nativeElement.querySelector(
          '.ds-select__search-input'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      });
    }
  }

  // Handle option selection
  protected onOptionSelect(
    option: SelectOption,
    event?: MouseEvent | Event
  ): void {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
      if (typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }
    }

    if (option.disabled) return;

    if (this.multiple()) {
      // For multiple selection, toggle the selected value
      this.value.update((currentValue) => {
        const currentValues = Array.isArray(currentValue)
          ? [...(currentValue as string[])]
          : [];

        const optionIndex = currentValues.indexOf(option.value);

        if (optionIndex > -1) {
          // Remove if already selected
          currentValues.splice(optionIndex, 1);
        } else {
          // Add to selection
          currentValues.push(option.value);
        }

        return currentValues;
      });

      // Multiple selection behavior can be controlled by the directive
      // Only close if not using the directive or if closeOnSelect is true
      const shouldCloseOnSelect =
        !this.multipleSelectDirective ||
        (this.multipleSelectDirective &&
          this.multipleSelectDirective.closeOnSelect());

      if (shouldCloseOnSelect) {
        this.closeDropdown();
      }
    } else {
      // For single selection, set the value and close the dropdown
      this.value.set(option.value);
      this.closeDropdown();
    }
  }

  // Handle checkbox changes for multiple select
  protected onCheckboxChange(option: SelectOption, event: Event): void {
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }

    if (option.disabled) return;

    const checkbox = event.target as HTMLInputElement;

    if (!checkbox || typeof checkbox.checked !== 'boolean') {
      return;
    }

    this.value.update((currentValue) => {
      const currentValues = Array.isArray(currentValue)
        ? [...(currentValue as string[])]
        : [];

      const optionIndex = currentValues.indexOf(option.value);

      if (checkbox.checked && optionIndex === -1) {
        currentValues.push(option.value);
      } else if (!checkbox.checked && optionIndex > -1) {
        currentValues.splice(optionIndex, 1);
      }

      return currentValues;
    });
  }

  // Check if an option is selected
  protected isOptionSelected(option: SelectOption): boolean {
    const val = this.value();

    if (val === null || val === undefined) return false;

    if (Array.isArray(val)) {
      return val.includes(option.value);
    }

    return val === option.value;
  }

  // Handle search input changes
  protected onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;
    this.searchText.set(searchValue);
    this.search.emit(searchValue);
    this.highlightedIndex.set(0);
  }

  // Clear the current selection
  protected clearSelection(event: Event): void {
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
    const newValue = this.multiple() ? [] : null;
    this.value.set(newValue);
  }

  protected onKeyDown(event: any): void {
    if (this.disabled() || this.loading()) return;

    const preventDefault = () => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
    };

    switch (event?.key) {
      case 'ArrowDown':
        preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
        } else {
          this.navigateOptions(1);
        }
        break;

      case 'ArrowUp':
        preventDefault();
        if (this.isOpen()) {
          this.navigateOptions(-1);
        }
        break;

      case 'Enter':
        preventDefault();
        if (this.isOpen()) {
          const highlightedOption = this.getHighlightedOption();
          if (highlightedOption) {
            this.onOptionSelect(highlightedOption);
          }
        } else {
          this.openDropdown();
        }
        break;

      case 'Escape':
        preventDefault();
        if (this.isOpen()) {
          this.closeDropdown();
        }
        break;

      case ' ':
        if (!this.isOpen()) {
          preventDefault();
          this.openDropdown();
        }
        break;
    }
  }

  protected onMouseEnterOption(index: number): void {
    this.highlightedIndex.set(index);
  }

  protected navigateOptions(step: number): void {
    const options = this.filteredOptions();
    if (!options.length) return;

    let newIndex = this.highlightedIndex() + step;

    // Wrap around if at the end or beginning
    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }

    // Skip disabled options
    if (options[newIndex].disabled) {
      const nextStep = step > 0 ? 1 : -1;
      this.highlightedIndex.set(newIndex);
      this.navigateOptions(nextStep);
      return;
    }

    this.highlightedIndex.set(newIndex);
    this.scrollOptionIntoView(newIndex);
  }

  protected scrollOptionIntoView(index: number): void {
    setTimeout(() => {
      const option = document.querySelector(
        `#${this.dropdownId}-option-${this.filteredOptions()[index]?.value}`
      );
      if (option) {
        option.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  protected getHighlightedOption(): SelectOption | null {
    const index = this.highlightedIndex();
    const options = this.filteredOptions();

    if (index >= 0 && index < options.length) {
      return options[index];
    }

    return null;
  }

  // Handle blur event
  protected onBlur(event: FocusEvent): void {
    // Close dropdown only if focus moved outside component and mouse is not over the dropdown
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Use a small delay to check if the mouse is over the dropdown
    // This helps prevent dropdown from closing when clicking on dropdown elements
    setTimeout(() => {
      if (
        !this.mouseOverDropdown() &&
        !this.elementRef.nativeElement.contains(relatedTarget)
      ) {
        this.closeDropdown();
      }
    }, 100);
  }

  // Track by functions for better performance
  protected trackByValue(_: number, option: SelectOption): string {
    return option.value;
  }

  protected trackByGroup(_: number, group: [string, SelectOption[]]): string {
    return group[0];
  }

  /**
   * Calculate the width of the dropdown to match the select element
   * This ensures dropdown is the same width as the select button
   */
  protected dropdownWidth(): number {
    return (
      this.elementRef.nativeElement.querySelector('.ds-select')?.offsetWidth ||
      0
    );
  }

  /**
   * Check if dropdown is currently open
   * This method allows directives to query the open state
   */
  isDropdownOpen(): boolean {
    return this.isOpen();
  }
}
