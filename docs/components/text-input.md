# Text Input Component

## Overview
The Text Input component is a versatile form input with various states, sizes, and accessibility features.

## Import
```typescript
import { TextInputComponent } from '@design-system/ui';
```

## Usage

### Basic Input
```html
<ds-ui-text-input placeholder="Enter text"></ds-ui-text-input>
```

### Input with Label
```html
<ds-ui-text-input 
  label="Full Name" 
  placeholder="Enter your full name">
</ds-ui-text-input>
```

### Required Input
```html
<ds-ui-text-input 
  label="Email" 
  placeholder="Enter your email" 
  [required]="true">
</ds-ui-text-input>
```

### Input with Status and Helper Text
```html
<ds-ui-text-input 
  label="Username" 
  placeholder="Choose a username" 
  helperText="Username must be at least 3 characters">
</ds-ui-text-input>
```

### Input with Error State
```html
<ds-ui-text-input 
  label="Password" 
  type="password" 
  placeholder="Enter password" 
  status="error" 
  errorMessage="Password is too weak">
</ds-ui-text-input>
```

### Different Input Types
```html
<ds-ui-text-input type="email" placeholder="Enter email"></ds-ui-text-input>
<ds-ui-text-input type="password" placeholder="Enter password"></ds-ui-text-input>
<ds-ui-text-input type="number" placeholder="Enter amount"></ds-ui-text-input>
<ds-ui-text-input type="tel" placeholder="Enter phone number"></ds-ui-text-input>
```

### Different Sizes
```html
<ds-ui-text-input size="sm" placeholder="Small input"></ds-ui-text-input>
<ds-ui-text-input size="md" placeholder="Medium input"></ds-ui-text-input>
<ds-ui-text-input size="lg" placeholder="Large input"></ds-ui-text-input>
```

### Disabled and Readonly States
```html
<ds-ui-text-input 
  label="Username" 
  [disabled]="true" 
  value="johndoe">
</ds-ui-text-input>

<ds-ui-text-input 
  label="User ID" 
  [readonly]="true" 
  value="12345">
</ds-ui-text-input>
```

### Two-way Binding
```html
<ds-ui-text-input 
  label="First Name" 
  [(value)]="firstName">
</ds-ui-text-input>
```

```typescript
firstName = 'John';
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | string | auto-generated | Unique identifier for the input |
| label | string | '' | Label text displayed above the input |
| value | signal<string> | '' | Input value (two-way bindable) |
| placeholder | string | '' | Placeholder text |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the input field |
| status | 'default' \| 'success' \| 'error' \| 'warning' | 'default' | Visual status of the input |
| helperText | string | '' | Helper text displayed below the input |
| errorMessage | string | '' | Error message displayed when status is 'error' |
| disabled | boolean | false | Whether the input is disabled |
| required | boolean | false | Whether the input is required |
| readonly | boolean | false | Whether the input is readonly |
| type | string | 'text' | HTML input type |
| maxlength | number | null | Maximum length of input |
| minlength | number | null | Minimum length of input |
| ariaLabel | string | null | Accessible label for the input |

## Events

| Name | Type | Description |
|------|------|-------------|
| inputChange | EventEmitter<string> | Emitted when the input value changes |
| inputBlur | EventEmitter<FocusEvent> | Emitted when the input loses focus |
| inputFocus | EventEmitter<FocusEvent> | Emitted when the input gains focus |

## Accessibility
- Automatically associates labels with inputs using `id` and `for` attributes
- Includes `aria-required` attribute when required
- Uses `aria-invalid` for error states
- Associates error messages with inputs using `aria-describedby`
- Supports custom `aria-label` for screen readers

## Design Guidelines
- Always use labels for inputs where possible
- Use placeholder text as a hint, not as a replacement for labels
- Use helper text to provide additional context
- Use specific error messages that explain how to fix the issue
- Use appropriate input types for different data (email, number, etc.)

## Examples

### Form with Multiple Fields
```html
<div class="form-group">
  <ds-ui-text-input 
    label="Email" 
    type="email" 
    [required]="true" 
    placeholder="Enter your email">
  </ds-ui-text-input>
  
  <ds-ui-text-input 
    label="Password" 
    type="password" 
    [required]="true" 
    placeholder="Enter your password"
    helperText="At least 8 characters with a number and symbol">
  </ds-ui-text-input>
  
  <ds-ui-button type="submit">Sign In</ds-ui-button>
</div>
```

### Input with Character Counter
```html
<ds-ui-text-input 
  label="Tweet" 
  [maxlength]="280" 
  helperText="Characters remaining: {{ 280 - tweetText.length }}"
  [(value)]="tweetText">
</ds-ui-text-input>
```

## Edge Cases

### Overflow Text
Long input values that exceed the visual width of the input will be scrollable horizontally within the input.

### Right-to-Left Languages
The component supports right-to-left text direction for languages that read right-to-left.

### Auto-filled Values
The component handles browser auto-fill behavior and applies appropriate styling.
