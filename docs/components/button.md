# Button Component

## Overview
The Button component is a versatile, accessible button component with various styles and states to meet different UI requirements.

## Import
```typescript
import { ButtonComponent } from '@design-system/ui';
```

## Usage

### Basic Button
```html
<ds-ui-button>Click me</ds-ui-button>
```

### Button Variants
```html
<ds-ui-button variant="primary">Primary</ds-ui-button>
<ds-ui-button variant="secondary">Secondary</ds-ui-button>
<ds-ui-button variant="tertiary">Tertiary</ds-ui-button>
```

### Button States
```html
<!-- Disabled Button -->
<ds-ui-button [disabled]="true">Disabled</ds-ui-button>

<!-- Loading Button -->
<ds-ui-button [loading]="true">Loading</ds-ui-button>

<!-- Full Width Button -->
<ds-ui-button [fullWidth]="true">Full Width</ds-ui-button>
```

### Button Types
```html
<ds-ui-button type="button">Standard</ds-ui-button>
<ds-ui-button type="submit">Submit</ds-ui-button>
<ds-ui-button type="reset">Reset</ds-ui-button>
```

### Event Handling
```html
<ds-ui-button (clicked)="handleClick($event)">Click me</ds-ui-button>
```

```typescript
handleClick(event: MouseEvent) {
  console.log('Button clicked', event);
}
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | The visual style of the button |
| disabled | boolean | false | Whether the button is disabled |
| loading | boolean | false | Whether to show a loading indicator |
| fullWidth | boolean | false | Whether the button should take up the full width of its container |
| type | 'button' \| 'submit' \| 'reset' | 'button' | HTML button type attribute |
| ariaLabel | string | null | Accessible label for the button |

## Events

| Name | Type | Description |
|------|------|-------------|
| clicked | EventEmitter<MouseEvent> | Emitted when the button is clicked |

## Accessibility
- Uses native `<button>` element for proper keyboard navigation
- Automatically adds `aria-disabled="true"` when disabled
- Supports custom `ariaLabel` for screen readers
- Maintains focus visibility for keyboard users

## Design Guidelines
- Use **Primary** buttons for main actions on a page
- Use **Secondary** buttons for alternative actions
- Use **Tertiary** buttons for less important actions
- Avoid using more than one primary button in a section
- Keep button text concise and action-oriented
- Use sentence case for button labels

## Examples

### Form Submission
```html
<form (submit)="onSubmit()">
  <!-- Form fields here -->
  <div class="button-group">
    <ds-ui-button variant="secondary" type="button" (clicked)="onCancel()">Cancel</ds-ui-button>
    <ds-ui-button variant="primary" type="submit">Submit</ds-ui-button>
  </div>
</form>
```

### Loading State
```html
<ds-ui-button 
  [loading]="isLoading" 
  [disabled]="isLoading" 
  (clicked)="submitForm()">
  {{ isLoading ? 'Submitting...' : 'Submit' }}
</ds-ui-button>
```

## Edge Cases

### Long Text
If button text is too long, it will wrap to multiple lines while maintaining proper padding.

### Rapid Clicking
The button has built-in protection against accidental double-clicks by automatically disabling briefly after being clicked.

### Touch Devices
The button has appropriately sized touch targets for mobile use (minimum 44x44px).
