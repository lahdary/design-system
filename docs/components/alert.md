# Alert Component

## Overview
The Alert component is used to display important messages to users. It supports multiple variants for different types of information and can be configured to be dismissible.

## Import
```typescript
import { AlertComponent } from '@design-system/ui';
```

## Usage

### Basic Alert
```html
<ds-ui-alert>
  This is a basic informational alert.
</ds-ui-alert>
```

### Alert with Different Variants
```html
<ds-ui-alert variant="info">This is an informational alert.</ds-ui-alert>
<ds-ui-alert variant="success">This is a success alert.</ds-ui-alert>
<ds-ui-alert variant="warning">This is a warning alert.</ds-ui-alert>
<ds-ui-alert variant="error">This is an error alert.</ds-ui-alert>
```

### Alert with Title
```html
<ds-ui-alert variant="success" title="Operation Successful">
  Your changes have been saved successfully.
</ds-ui-alert>
```

### Dismissible Alert
```html
<ds-ui-alert 
  variant="warning" 
  [dismissible]="true" 
  (closed)="onAlertClosed()">
  This alert can be dismissed by clicking the close button.
</ds-ui-alert>
```

### Alert without Icon
```html
<ds-ui-alert [hasIcon]="false">
  This alert doesn't have an icon.
</ds-ui-alert>
```

### Solid Background Alert
```html
<ds-ui-alert variant="info" [solid]="true">
  This alert has a solid background color.
</ds-ui-alert>
```

### Elevated Alert
```html
<ds-ui-alert variant="success" [elevated]="true">
  This alert has a subtle shadow.
</ds-ui-alert>
```

### Alert without Border
```html
<ds-ui-alert [bordered]="false">
  This alert doesn't have a border.
</ds-ui-alert>
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | '' | Optional title for the alert |
| variant | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | The style variant of the alert |
| dismissible | boolean | false | Whether the alert can be dismissed |
| hasIcon | boolean | true | Whether to display an icon |
| bordered | boolean | true | Whether the alert has a border |
| solid | boolean | false | Whether the alert has a solid background |
| elevated | boolean | false | Whether the alert has a shadow |
| visible | signal<boolean> | true | Controls the visibility of the alert |

## Events

| Name | Type | Description |
|------|------|-------------|
| closed | EventEmitter<void> | Emitted when the alert is closed |

## Accessibility
- Uses `role="alert"` to ensure screen readers announce the content
- Close button includes an appropriate `aria-label`
- Icons are purely decorative and don't interfere with screen reader functionality

## Design Guidelines
- Use the appropriate variant for the message type:
  - **Info**: General information that isn't critical
  - **Success**: Confirmation of a successful action
  - **Warning**: Information that needs attention but isn't an error
  - **Error**: Critical problems that need immediate attention
- Keep alert messages clear and concise
- Place alerts close to relevant content or actions
- Use titles for more complex alerts that need additional context
- Avoid using too many alerts at once

## Examples

### Form Submission Feedback
```html
<!-- Success case -->
<ds-ui-alert 
  *ngIf="formSubmitSuccess" 
  variant="success" 
  [dismissible]="true"
  (closed)="formSubmitSuccess = false">
  Your form has been submitted successfully.
</ds-ui-alert>

<!-- Error case -->
<ds-ui-alert 
  *ngIf="formSubmitError" 
  variant="error" 
  [dismissible]="true"
  (closed)="formSubmitError = false">
  There was an error submitting your form. Please try again.
</ds-ui-alert>
```

### System Status Alert
```html
<ds-ui-alert 
  variant="warning" 
  [solid]="true" 
  [elevated]="true" 
  title="Scheduled Maintenance">
  The system will be unavailable on Sunday, June 25th from 2:00 AM to 4:00 AM EST for scheduled maintenance.
</ds-ui-alert>
```

### Dynamic Alert Based on State
```html
<ds-ui-alert 
  [variant]="getAlertVariant()" 
  [title]="getAlertTitle()"
  [dismissible]="true"
  (closed)="clearAlert()">
  {{ alertMessage }}
</ds-ui-alert>
```

```typescript
getAlertVariant() {
  switch(this.alertType) {
    case 'error': return 'error';
    case 'success': return 'success';
    case 'warning': return 'warning';
    default: return 'info';
  }
}

getAlertTitle() {
  switch(this.alertType) {
    case 'error': return 'Error';
    case 'success': return 'Success';
    case 'warning': return 'Warning';
    default: return 'Information';
  }
}
```

## Edge Cases

### Long Content
Alert content will wrap to multiple lines when necessary, and the alert will expand vertically to accommodate the content.

### Multiple Dismissible Alerts
When displaying multiple dismissible alerts, each can be individually closed without affecting others.

### Animations
The alert component includes smooth entrance and exit animations for a polished user experience.
