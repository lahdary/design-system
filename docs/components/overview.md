# Components Overview

This document provides a comprehensive overview of all the components in our design system.

## Core Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Button](components/button.md) | Versatile button component with various styles and states | Complete |
| [Text Input](components/text-input.md) | Form input component with various states and validations | Complete |
| [Card](components/card.md) | Container component for grouping related content | Complete |
| [Alert](components/alert.md) | Notification component for important messages | Complete |
| [Badge](components/badge.md) | Small label component for status or categorization | Complete |

## Usage Guidelines

### Component Selection

When building interfaces, follow these guidelines for choosing components:

1. **Consistency** - Use the same component for the same purpose across your application
2. **Simplicity** - Choose the simplest component that meets your needs
3. **Accessibility** - Ensure components are used in accessible ways

### Theme Support

All components support both light and dark themes using CSS custom properties (variables). Theme switching is controlled at the application level.

Example of switching themes:
```html
<body data-theme="dark">
  <!-- Components will automatically use dark theme -->
</body>
```

### Responsive Design

All components are designed to be responsive and work well on mobile, tablet, and desktop devices. Components will adapt to their containers appropriately.

### Accessibility Standards

All components follow WCAG 2.1 AA standards by:
- Using appropriate semantic HTML
- Supporting keyboard navigation
- Providing proper focus indicators
- Including ARIA attributes when necessary
- Maintaining color contrast ratios

## Best Practices

### Forms

When building forms:
- Group related fields together
- Use appropriate input types
- Display validation errors inline
- Mark required fields clearly
- Provide clear submission actions

Example:
```html
<form>
  <ds-ui-text-input 
    label="Email" 
    type="email" 
    [required]="true">
  </ds-ui-text-input>
  
  <ds-ui-text-input 
    label="Password" 
    type="password" 
    [required]="true">
  </ds-ui-text-input>
  
  <ds-ui-button type="submit">Sign In</ds-ui-button>
</form>
```

### Feedback Messages

When displaying user feedback:
- Use appropriate alert variants (success, error, etc.)
- Position feedback near the relevant action
- Make messages clear and actionable
- Allow users to dismiss non-critical messages

Example:
```html
<ds-ui-alert 
  variant="success" 
  [dismissible]="true">
  Your profile has been updated successfully.
</ds-ui-alert>
```

## Customization

Components can be customized through:

1. **Properties** - Use component properties to adjust behavior and appearance
2. **CSS Variables** - Override design tokens for theming
3. **Class Extensions** - Create specialized components by extending base components
4. **Composition** - Combine components to create more complex interfaces

## Accessibility Testing

To ensure components meet accessibility standards:

1. Test keyboard navigation (tab order, focus states)
2. Test with screen readers (NVDA, JAWS, VoiceOver)
3. Check color contrast ratios
4. Validate ARIA attributes
5. Test at different zoom levels (up to 200%)
