import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Buttons/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
      description: 'The visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button shows a loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes up the full width of its container',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the button',
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' },
      description: 'The HTML button type attribute',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    clicked: {
      action: 'clicked',
      description: 'Event emitted when button is clicked',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Primary Button</ds-ui-button>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Secondary Button</ds-ui-button>`,
  }),
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Tertiary Button</ds-ui-button>`,
  }),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Small Button</ds-ui-button>`,
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Large Button</ds-ui-button>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Disabled Button</ds-ui-button>`,
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Loading Button</ds-ui-button>`,
  }),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Full Width Button</ds-ui-button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>Primary Variant</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <ds-ui-button variant="primary" size="sm">Small</ds-ui-button>
          <ds-ui-button variant="primary" size="md">Medium</ds-ui-button>
          <ds-ui-button variant="primary" size="lg">Large</ds-ui-button>
          <ds-ui-button variant="primary" disabled>Disabled</ds-ui-button>
          <ds-ui-button variant="primary" loading>Loading</ds-ui-button>
        </div>

        <h3>Secondary Variant</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <ds-ui-button variant="secondary" size="sm">Small</ds-ui-button>
          <ds-ui-button variant="secondary" size="md">Medium</ds-ui-button>
          <ds-ui-button variant="secondary" size="lg">Large</ds-ui-button>
          <ds-ui-button variant="secondary" disabled>Disabled</ds-ui-button>
          <ds-ui-button variant="secondary" loading>Loading</ds-ui-button>
        </div>

        <h3>Tertiary Variant</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <ds-ui-button variant="tertiary" size="sm">Small</ds-ui-button>
          <ds-ui-button variant="tertiary" size="md">Medium</ds-ui-button>
          <ds-ui-button variant="tertiary" size="lg">Large</ds-ui-button>
          <ds-ui-button variant="tertiary" disabled>Disabled</ds-ui-button>
          <ds-ui-button variant="tertiary" loading>Loading</ds-ui-button>
        </div>
      </div>
    `,
  }),
};
