# Select Component

A customizable, accessible Select/Dropdown component for Angular applications.

## Features

- Single and multiple selection modes
- Searchable options
- Option grouping
- Keyboard navigation
- Screen reader support
- Loading state
- Error state
- Customizable size variants
- Clearable selection
- Both Component and Directive implementations

## Usage

### Select Component

```html
<ds-select
  [options]="options"
  [value]="selectedValue"
  [placeholder]="'Select an option'"
  [disabled]="isDisabled"
  [loading]="isLoading"
  [error]="errorMessage"
  [required]="isRequired"
  [multiple]="allowMultiple"
  [searchable]="isSearchable"
  [size]="'md'"
  [clearable]="allowClear"
  (valueChange)="handleValueChange($event)"
  (opened)="handleOpened()"
  (closed)="handleClosed()"
  (search)="handleSearch($event)"
></ds-select>
```

### Select Directive (for native select elements)

```html
<select
  ds-ui-select
  [options]="options"
  [value]="selectedValue"
  [placeholder]="'Select an option'"
  [disabled]="isDisabled"
  [loading]="isLoading"
  [error]="errorMessage"
  [required]="isRequired"
  [multiple]="allowMultiple"
  [size]="'md'"
  (valueChange)="handleValueChange($event)"
></select>
```

## API Reference

See the `COMPONENT.md` file for detailed API documentation.

## Accessibility

The Select component follows WAI-ARIA guidelines for combobox and listbox components:

- Uses appropriate ARIA attributes for state and relationships
- Supports keyboard navigation
- Announces selection changes to screen readers
- Traps focus within dropdown when open
- Maintains color contrast ratios

## Customization

The component can be customized through the design system's theming variables:
