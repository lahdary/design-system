# Design System Project Instructions

## Overview
This repository contains our design system - a collection of reusable components, design tokens, and guidelines that ensure consistency across our products.

## Repository Structure
- `/components` - UI components
- `/tokens` - Design tokens (colors, typography, spacing)
- `/styles` - Global styles and themes
- `/docs` - Documentation
- `/tests` - Unit and integration tests (using Jest)
- `/examples` - Usage examples

## Component Development Guidelines:
 * 1. Use signal() for state management
 * 2. Export all components from index.ts
 * 3. Do not use the `any` type
 * 4. Enforce typing, every variable must have its type explicitly declared
 * 5. Apply theme colors using SCSS variables (e.g., color: var(--color-text);)
 * 6. Include Storybook stories using CSF with args and controls
 * 7. Use `OnPush` change detection strategy for all components
 * 8. Implement `trackBy` functions for `@for` loops
 * 9. Every component must meet WCAG 2.1 AA accessibility standards
 * 10. Include appropriate ARIA attributes and support keyboard navigation
 * 11. Document all inputs/outputs with JSDoc comments
 * 12. Maintain consistent input/output naming conventions across components
 * 13. All components should have consistent prop/input naming conventions
 * 14. Use strongly typed props with default values where appropriate
 * 15. Document allowed values for each input using JSDoc comments
 * 16. Use Angular's built-in control flow syntax (@if, @for) instead of structural directives (ngIf, ngFor) for better performance and type safety
 * 17. Use input() and output() signals instead of @Input() and @Output() decorators for reactive component communication

## Requirements
- Use standalone Angular components
- Use signal() from @angular/core for state (NO async pipe)
- Support both light and dark themes using CSS variables
- Components must be atomic and minimal (smallest possible units)
- Styling is SCSS-based, no Tailwind or CSS-in-JS
- Each component must include a .stories.ts file for Storybook
- Follow strict separation of concerns: logic in TS, style in SCSS, templates clean

## Recommended Project Structure

```
design-system/
├── libs/                                 # Main library folder
│   ├── ui/                               # UI components library  
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/           # Component categories
│   │   │   │   │   ├── buttons/          # Button components
│   │   │   │   │   │   ├── button/       # Basic button component
│   │   │   │   │   │   │   ├── button.component.ts
│   │   │   │   │   │   │   ├── button.component.html
│   │   │   │   │   │   │   ├── button.component.scss
│   │   │   │   │   │   │   ├── button.component.spec.ts
│   │   │   │   │   │   │   └── button.stories.ts
│   │   │   │   │   │   ├── icon-button/  # Icon button variant
│   │   │   │   │   │   └── index.ts      # Exports all button components
│   │   │   │   │   ├── forms/           # Form components
│   │   │   │   │   ├── layout/          # Layout components
│   │   │   │   │   └── data-display/    # Data display components
│   │   │   │   ├── tokens/              # Design tokens
│   │   │   │   │   ├── colors.ts        # Color definitions
│   │   │   │   │   ├── spacing.ts       # Spacing scale
│   │   │   │   │   └── typography.ts    # Typography definitions
│   │   │   │   ├── styles/              # Global styles
│   │   │   │   │   ├── _variables.scss  # SCSS variables
│   │   │   │   │   ├── _mixins.scss     # SCSS mixins
│   │   │   │   │   └── themes/          # Theme definitions
│   │   │   │   │       ├── _light.scss
│   │   │   │   │       └── _dark.scss
│   │   │   │   ├── directives/          # Custom directives
│   │   │   │   ├── pipes/               # Custom pipes
│   │   │   │   ├── interfaces/          # TypeScript interfaces
│   │   │   │   └── utils/               # Utility functions
│   │   │   └── index.ts                 # Public API exports
│   │   ├── .storybook/                  # Storybook configuration
│   │   └── project.json                 # Nx project configuration
├── apps/
│   └── showcase/                        # Demo application
├── docs/                                # Documentation site
└── e2e/                                # E2E tests
```

## Architecture Best Practices

### Layered Component Approach
- Base/primitive components (buttons, inputs)
- Composite components (forms, cards)
- Page-level components (layouts, templates)

### Signal-Based State Management Pattern
- Use component-local signals for simple state
- Create signal-based services for shared state
- Implement computed signals for derived values

### Dependency Management
- Keep external dependencies to a minimum
- Use dependency injection for services and configuration
- Create a clear public API surface for your library

### Theme Implementation
- Use CSS custom properties for theme tokens
- Implement a theme provider service with signal() for theme switching
- Use attribute selectors `[data-theme="dark"]` for theme context

### Component Communication
- Prefer inputs/outputs for parent-child communication
- Use signals for component-to-component communication
- Create specialized services for complex cross-component communication

### Testing Standards
- Unit tests must cover public API and edge cases
- Component tests should simulate real user interactions
- Visual regression tests using Storybook and Chromatic

### Performance Optimizations
- Use `OnPush` change detection strategy for all components
- Implement `trackBy` functions for `*ngFor` loops
- Avoid unnecessary template expressions and calculations
- Lazy load complex components when possible

### Documentation Standards
- Every component must include:
  * Usage examples
  * Props/inputs tables
  * Accessibility considerations
  * Edge cases and limitations
  * Design guidelines and variants

### Code Organization
- Group related components into feature modules
- Keep component files small and focused
- Extract complex logic into separate services
- Use facade pattern for complex component interactions

### Versioning and Release Strategy
- Follow Semantic Versioning (SemVer)
- Maintain a detailed changelog
- Include migration guides for breaking changes
- Create deprecation paths for API changes

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Angular CLI (v20+)

### Installation
# Install dependencies
npm install

# Install Storybook if not already included
npm install --save-dev @nx/storybook

# Generate Storybook configuration for the project
npx nx g @nx/angular:storybook-configuration design-system

# Generate stories for components (if needed)
npx nx g @nx/angular:stories --project=design-system
# Install dependencies
npm install

# Install Storybook if not already included
npm install --save-dev @nx/storybook

# Generate Storybook configuration for the project
npx nx g @nx/angular:storybook-configuration design-system

# Generate stories for components (if needed)
npx nx g @nx/angular:stories --project=design-system
