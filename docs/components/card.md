# Card Component

## Overview
The Card component is a flexible container that groups related content and actions. It can be configured with different levels of elevation, padding, and border radius to fit various design needs.

## Import
```typescript
import { CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent } from '@design-system/ui';
```

## Usage

### Basic Card
```html
<ds-ui-card>
  <ds-ui-card-body>
    This is a simple card with default styling.
  </ds-ui-card-body>
</ds-ui-card>
```

### Card with Header, Body, and Footer
```html
<ds-ui-card>
  <ds-ui-card-header>
    <h3>Card Title</h3>
  </ds-ui-card-header>
  <ds-ui-card-body>
    This is the main content area of the card.
  </ds-ui-card-body>
  <ds-ui-card-footer>
    <ds-ui-button variant="primary">Action</ds-ui-button>
  </ds-ui-card-footer>
</ds-ui-card>
```

### Card with Different Elevation
```html
<ds-ui-card elevation="0">Flat card (no elevation)</ds-ui-card>
<ds-ui-card elevation="1">Low elevation</ds-ui-card>
<ds-ui-card elevation="2">Medium elevation (default)</ds-ui-card>
<ds-ui-card elevation="3">High elevation</ds-ui-card>
```

### Card with Different Border Radius
```html
<ds-ui-card radius="none">No border radius</ds-ui-card>
<ds-ui-card radius="sm">Small border radius</ds-ui-card>
<ds-ui-card radius="md">Medium border radius (default)</ds-ui-card>
<ds-ui-card radius="lg">Large border radius</ds-ui-card>
<ds-ui-card radius="full">Fully rounded corners</ds-ui-card>
```

### Card with Different Padding
```html
<ds-ui-card padding="none">No padding</ds-ui-card>
<ds-ui-card padding="sm">Small padding</ds-ui-card>
<ds-ui-card padding="md">Medium padding (default)</ds-ui-card>
<ds-ui-card padding="lg">Large padding</ds-ui-card>
```

### Interactive Card
```html
<ds-ui-card [interactive]="true" (click)="onCardClick()">
  <ds-ui-card-body>
    Click this card to trigger an action. 
    Interactive cards have hover effects.
  </ds-ui-card-body>
</ds-ui-card>
```

### Bordered Card
```html
<ds-ui-card [bordered]="true">
  <ds-ui-card-body>
    This card has a border.
  </ds-ui-card-body>
</ds-ui-card>
```

### Full Width Card
```html
<ds-ui-card [fullWidth]="true">
  <ds-ui-card-body>
    This card takes up the full width of its container.
  </ds-ui-card-body>
</ds-ui-card>
```

## Properties

### CardComponent

| Name | Type | Default | Description |
|------|------|---------|-------------|
| elevation | 0 \| 1 \| 2 \| 3 | 2 | The elevation level of the card |
| radius | 'none' \| 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | The border radius style |
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | The padding inside the card |
| bordered | boolean | false | Whether the card has a border |
| interactive | boolean | false | Whether the card has hover effects |
| fullWidth | boolean | false | Whether the card takes up full width |

## Accessibility
- Cards use appropriate semantic markup
- When used as interactive elements, they should include appropriate ARIA attributes
- Interactive cards should have a visible focus state for keyboard navigation

## Design Guidelines
- Use cards to group related pieces of content
- Maintain consistent spacing between cards
- Use elevation to establish hierarchy (higher elevation = more important)
- Avoid nesting cards within cards
- Keep card content concise and focused

## Examples

### Product Card
```html
<ds-ui-card [interactive]="true" radius="lg">
  <ds-ui-card-body padding="none">
    <img src="product-image.jpg" alt="Product Name" class="card-image">
    <div class="card-content" style="padding: var(--spacing-4);">
      <h3>Product Name</h3>
      <p>Product description goes here</p>
      <div class="price">$99.99</div>
      <ds-ui-button variant="primary" [fullWidth]="true">Add to Cart</ds-ui-button>
    </div>
  </ds-ui-card-body>
</ds-ui-card>
```

### Dashboard Card
```html
<ds-ui-card elevation="1" [bordered]="true">
  <ds-ui-card-header>
    <div class="header-with-icon">
      <span class="material-icons">trending_up</span>
      <h3>Monthly Sales</h3>
    </div>
  </ds-ui-card-header>
  <ds-ui-card-body>
    <div class="chart-container">
      <!-- Chart component would go here -->
    </div>
    <div class="stats">
      <div class="stat">
        <div class="stat-value">$45,231</div>
        <div class="stat-label">Total Revenue</div>
      </div>
      <div class="stat">
        <div class="stat-value">+12.5%</div>
        <div class="stat-label">Growth</div>
      </div>
    </div>
  </ds-ui-card-body>
  <ds-ui-card-footer>
    <ds-ui-button variant="tertiary">View Full Report</ds-ui-button>
  </ds-ui-card-footer>
</ds-ui-card>
```

## Edge Cases

### Empty Cards
Cards should generally not be empty. If a card might be empty (e.g., due to conditional content), consider adding a placeholder or hiding the card entirely.

### Overflowing Content
Long content within cards will be contained within the card boundaries. Text will wrap, and if necessary, scrollbars will appear for very tall content.

### Responsive Behavior
Cards will adjust their width based on their container. On smaller screens, cards should typically stack vertically instead of displaying side-by-side.
