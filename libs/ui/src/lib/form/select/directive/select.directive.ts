import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnChanges,
  Optional,
  Renderer2,
  SimpleChanges,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { SelectOption, SelectSize, SelectValue } from '../select.types';

/**
 * Select Directive
 *
 * Enhances native HTML select elements with design system styling and behavior
 */
@Directive({
  selector: 'select[ds-ui-select]',
  standalone: true,
  host: {
    class: 'ds-select',
    '[attr.aria-invalid]': '!!error()',
  },
})
export class SelectDirective implements OnChanges {
  private elementRef = inject(ElementRef<HTMLSelectElement>);
  private renderer = inject(Renderer2);
  @Optional() private selectControl = inject(SelectControlValueAccessor, {
    optional: true,
  });

  // Inputs
  options = input<SelectOption[]>([]);
  value = input<SelectValue>(null);
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  error = input<string | null>(null);
  required = input<boolean>(false);
  multiple = input<boolean>(false);
  size = input<SelectSize>('md');

  // Not applicable for native select
  searchable = input<boolean>(false);
  clearable = input<boolean>(false);

  // Outputs
  valueChange = output<SelectValue>();

  // Internal state
  private isFocused = signal(false);

  constructor() {
    // Apply input values whenever they change
    effect(() => {
      // Apply disabled state
      const disabledValue = this.disabled() || this.loading();
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'disabled',
        disabledValue
      );

      // Apply multiple state
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'multiple',
        this.multiple()
      );

      // Apply required state
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'required',
        this.required()
      );

      // Update CSS classes
      this.updateClasses();
    });

    // Auto-generate options from input
    effect(() => {
      const options = this.options();
      if (options && options.length > 0) {
        this.updateSelectOptions();
      }
    });

    // Update value when it changes
    effect(() => {
      const value = this.value();
      this.updateSelectValue();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // This is needed for non-signal properties or complex logic
  }

  @HostBinding('class.ds-select--sm')
  get isSmall(): boolean {
    return this.size() === 'sm';
  }

  @HostBinding('class.ds-select--md')
  get isMedium(): boolean {
    return this.size() === 'md';
  }

  @HostBinding('class.ds-select--lg')
  get isLarge(): boolean {
    return this.size() === 'lg';
  }

  @HostBinding('class.ds-select--disabled')
  get isDisabled(): boolean {
    return this.disabled() || this.loading();
  }

  @HostBinding('class.ds-select--error')
  get hasError(): boolean {
    return !!this.error();
  }

  @HostBinding('class.ds-select--focused')
  get focused(): boolean {
    return this.isFocused();
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused.set(true);
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused.set(false);
  }

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newValue = this.extractSelectValue(select);
    this.valueChange.emit(newValue);
  }

  /**
   * Updates the native select's options based on the provided options array
   */
  private updateSelectOptions(): void {
    const select = this.elementRef.nativeElement;
    const options = this.options();

    // Clear existing options (except the first one if it's a placeholder)
    while (select.options.length > 0) {
      select.options.remove(0);
    }

    // Add placeholder option if needed
    if (!this.multiple() && this.placeholder()) {
      const placeholderOption = this.renderer.createElement(
        'option'
      ) as HTMLOptionElement;
      this.renderer.setProperty(placeholderOption, 'value', '');
      this.renderer.setProperty(
        placeholderOption,
        'textContent',
        this.placeholder()
      );
      this.renderer.appendChild(select, placeholderOption);

      // If no value is set, select the placeholder
      if (!this.value()) {
        this.renderer.setProperty(placeholderOption, 'selected', true);
      }
    }

    // Group options if they have group property
    const groups: { [key: string]: HTMLOptGroupElement } = {};

    // Add options from the provided array
    for (const option of options) {
      const optionEl = this.renderer.createElement(
        'option'
      ) as HTMLOptionElement;
      this.renderer.setProperty(optionEl, 'value', option.value);
      this.renderer.setProperty(optionEl, 'textContent', option.label);
      this.renderer.setProperty(optionEl, 'disabled', option.disabled || false);

      if (option.group) {
        // Create or get the option group
        if (!groups[option.group]) {
          const groupEl = this.renderer.createElement(
            'optgroup'
          ) as HTMLOptGroupElement;
          this.renderer.setProperty(groupEl, 'label', option.group);
          this.renderer.appendChild(select, groupEl);
          groups[option.group] = groupEl;
        }

        // Add option to its group
        this.renderer.appendChild(groups[option.group], optionEl);
      } else {
        // Add option directly to select
        this.renderer.appendChild(select, optionEl);
      }
    }

    // Set the current value
    this.updateSelectValue();
  }

  /**
   * Updates the select element's value based on the input value
   */
  private updateSelectValue(): void {
    const select = this.elementRef.nativeElement;
    const value = this.value();

    if (value === null || value === undefined) {
      select.value = '';
      return;
    }

    if (this.multiple() && Array.isArray(value)) {
      // For multiple select, set the selected property on each option
      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        option.selected = value.includes(option.value);
      }
    } else if (!Array.isArray(value)) {
      // For single select, just set the value
      select.value = value;
    }

    // If we have a form integration, update the value
    if (this.selectControl) {
      this.selectControl.writeValue(value);
    }
  }

  /**
   * Extracts the current value from the select element
   */
  private extractSelectValue(select: HTMLSelectElement): SelectValue {
    if (this.multiple()) {
      const selectedValues: string[] = [];

      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        if (option.selected && option.value) {
          selectedValues.push(option.value);
        }
      }

      return selectedValues.length ? selectedValues : [];
    }

    return select.value || null;
  }

  /**
   * Updates CSS classes based on current state
   */
  private updateClasses(): void {
    const select = this.elementRef.nativeElement;

    // We're using HostBinding for most classes, but this allows
    // adding any additional dynamic classes if needed
  }
}
