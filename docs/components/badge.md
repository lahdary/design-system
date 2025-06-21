# Badge Component

## Overview
The Badge component is used to highlight and categorize items, typically displaying short status text, counts, or labels.

## Import
```typescript
import { BadgeComponent } from '@design-system/ui';
```

## Usage

### Basic Badge
```html
<ds-ui-badge>New</ds-ui-badge>
```

### Badge Variants
```html
<ds-ui-badge variant="primary">Primary</ds-ui-badge>
<ds-ui-badge variant="secondary">Secondary</ds-ui-badge>
<ds-ui-badge variant="success">Success</ds-ui-badge>
<ds-ui-badge variant="warning">Warning</ds-ui-badge>
<ds-ui-badge variant="error">Error</ds-ui-badge>
<ds-ui-badge variant="info">Info</ds-ui-badge>
```

### Badge Sizes
```html
<ds-ui-badge size="sm">Small</ds-ui-badge>
<ds-ui-badge size="md">Medium</ds-ui-badge>
<ds-ui-badge size="lg">Large</ds-ui-badge>
```

### Outline Badge
```html
<ds-ui-badge [outline]="true">Outline</ds-ui-badge>
```

### Rounded Badge
```html
<ds-ui-badge [rounded]="true">Pill</ds-ui-badge>
```

### Badge with Icon
```html
<ds-ui-badge icon="star">Featured</ds-ui-badge>
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'primary' | The style variant of the badge |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the badge |
| outline | boolean | false | Whether the badge has an outline style |
| rounded | boolean | false | Whether the badge has fully rounded corners (pill shape) |
| icon | string \| null | null | Material icon name to display before content |

## Accessibility
- Badges are primarily visual elements and should not be the only way to convey important information
- Text color maintains sufficient contrast against background for readability
- When badges communicate status, ensure the information is available to screen readers

## Design Guidelines
- Keep badge text short - ideally a single word or number
- Use consistent badge styles throughout your application
- Choose badge variants that intuitively match their meaning:
  - **Primary/Secondary**: General categorization or tagging
  - **Success**: Positive status (completed, approved)
  - **Warning**: Requires attention but not critical
  - **Error**: Negative status (failed, rejected)
  - **Info**: Neutral information
- Avoid using too many badges in close proximity

## Examples

### User Status
```html
<div class="user-card">
  <img src="user-avatar.jpg" alt="User Avatar">
  <div class="user-info">
    <h3>Jane Smith</h3>
    <ds-ui-badge variant="success" size="sm">Online</ds-ui-badge>
  </div>
</div>
```

### Feature Tags
```html
<div class="product-card">
  <h3>Premium Headphones</h3>
  <div class="product-tags">
    <ds-ui-badge variant="primary" [rounded]="true">Wireless</ds-ui-badge>
    <ds-ui-badge variant="info" [rounded]="true">Bluetooth 5.0</ds-ui-badge>
    <ds-ui-badge variant="secondary" [rounded]="true">Noise-canceling</ds-ui-badge>
  </div>
  <p>Experience crystal clear sound with our premium wireless headphones.</p>
</div>
```

### Notification Count
```html
<button class="notification-button">
  <span class="material-icons">notifications</span>
  <ds-ui-badge variant="error" size="sm" [rounded]="true">8</ds-ui-badge>
</button>
```

### Status Indicators
```html
<div class="task-list">
  <div class="task-item">
    <span>Complete project proposal</span>
    <ds-ui-badge variant="success">Completed</ds-ui-badge>
  </div>
  <div class="task-item">
    <span>Review design mockups</span>
    <ds-ui-badge variant="warning">In Progress</ds-ui-badge>
  </div>
  <div class="task-item">
    <span>Implement user authentication</span>
    <ds-ui-badge variant="secondary">Not Started</ds-ui-badge>
  </div>
</div>
```

### Badge with Icon
```html
<ds-ui-badge variant="primary" icon="verified">Verified</ds-ui-badge>
<ds-ui-badge variant="warning" icon="schedule">Pending</ds-ui-badge>
<ds-ui-badge variant="info" icon="info">Info</ds-ui-badge>
```

## Edge Cases

### Empty Badge
Badges should always contain content. If no content is provided, consider not rendering the badge.

### Long Text
If badge text is too long, it will either wrap to a new line or be truncated with an ellipsis depending on the container's constraints.

### Small Containers
When placed in small containers, badges will maintain their minimum dimensions to ensure readability.
