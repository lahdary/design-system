import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from '../badge.component';

/**
 * # Badge
 * 
 * Badges are small components typically used for counts, labels, or status indicators.
 * 
 * ## Features
 * 
 * - Multiple variants with meaningful colors
 * - Three size options
 * - Outline variation
 * - Rounded pill option
 * - Optional icon support
 */
export default {
  title: 'Components/Badge',
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [BadgeComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The visual style of the badge',
      defaultValue: 'primary'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
      defaultValue: 'md'
    },
    outline: {
      control: { type: 'boolean' },
      description: 'Whether to display the badge with an outline style',
      defaultValue: false
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Whether the badge is rounded (pill-shaped)',
      defaultValue: false
    },
    icon: {
      control: { type: 'text' },
      description: 'Optional Material Icon name to display before content'
    }
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Badges are used to highlight information or draw attention to status.'
      }
    }
  }
} as Meta<BadgeComponent>;

type Story = StoryObj<BadgeComponent>;

/**
 * Default badge.
 */
export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      content: 'Badge'
    },
    template: `
      <ds-ui-badge
        [variant]="variant"
        [size]="size"
        [outline]="outline"
        [rounded]="rounded"
        [icon]="icon">
        {{content}}
      </ds-ui-badge>
    `
  }),
  args: {
    variant: 'primary',
    size: 'md',
    outline: false,
    rounded: false,
    icon: null
  }
};

/**
 * All badge variants.
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ds-ui-badge variant="primary">Primary</ds-ui-badge>
        <ds-ui-badge variant="secondary">Secondary</ds-ui-badge>
        <ds-ui-badge variant="success">Success</ds-ui-badge>
        <ds-ui-badge variant="warning">Warning</ds-ui-badge>
        <ds-ui-badge variant="error">Error</ds-ui-badge>
        <ds-ui-badge variant="info">Info</ds-ui-badge>
      </div>
    `
  })
};

/**
 * Outline style badges.
 */
export const Outline: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ds-ui-badge variant="primary" [outline]="true">Primary</ds-ui-badge>
        <ds-ui-badge variant="secondary" [outline]="true">Secondary</ds-ui-badge>
        <ds-ui-badge variant="success" [outline]="true">Success</ds-ui-badge>
        <ds-ui-badge variant="warning" [outline]="true">Warning</ds-ui-badge>
        <ds-ui-badge variant="error" [outline]="true">Error</ds-ui-badge>
        <ds-ui-badge variant="info" [outline]="true">Info</ds-ui-badge>
      </div>
    `
  })
};

/**
 * Rounded (pill-shaped) badges.
 */
export const Rounded: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ds-ui-badge variant="primary" [rounded]="true">Primary</ds-ui-badge>
        <ds-ui-badge variant="secondary" [rounded]="true">Secondary</ds-ui-badge>
        <ds-ui-badge variant="success" [rounded]="true">Success</ds-ui-badge>
        <ds-ui-badge variant="warning" [rounded]="true">Warning</ds-ui-badge>
        <ds-ui-badge variant="error" [rounded]="true">Error</ds-ui-badge>
        <ds-ui-badge variant="info" [rounded]="true">Info</ds-ui-badge>
      </div>
    `
  })
};

/**
 * Different badge sizes.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <ds-ui-badge variant="primary" size="sm">Small</ds-ui-badge>
        <ds-ui-badge variant="primary" size="md">Medium</ds-ui-badge>
        <ds-ui-badge variant="primary" size="lg">Large</ds-ui-badge>
      </div>
    `
  })
};

/**
 * Badges with icons.
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ds-ui-badge variant="success" [icon]="'check_circle'">Completed</ds-ui-badge>
        <ds-ui-badge variant="error" [icon]="'error'">Failed</ds-ui-badge>
        <ds-ui-badge variant="warning" [icon]="'warning'">Warning</ds-ui-badge>
        <ds-ui-badge variant="info" [icon]="'info'">Information</ds-ui-badge>
        <ds-ui-badge variant="primary" [icon]="'star'">Featured</ds-ui-badge>
      </div>
    `
  })
};
