import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './../components';

// Component stories
const componentMeta: Meta<ButtonComponent> = {
  title: 'Components/Button/Component',
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
      description:
        'Whether the button takes up the full width of its container',
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

export default componentMeta;
type ComponentStory = StoryObj<ButtonComponent>;

export const Component_Primary: ComponentStory = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Primary Button</ds-ui-button>`,
  }),
};

export const Component_Secondary: ComponentStory = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Secondary Button</ds-ui-button>`,
  }),
};

export const Component_Tertiary: ComponentStory = {
  args: {
    variant: 'tertiary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Tertiary Button</ds-ui-button>`,
  }),
};

export const Component_Small: ComponentStory = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Small Button</ds-ui-button>`,
  }),
};

export const Component_Medium: ComponentStory = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Medium Button</ds-ui-button>`,
  }),
};

export const Component_Large: ComponentStory = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Large Button</ds-ui-button>`,
  }),
};

export const Component_Disabled: ComponentStory = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Disabled Button</ds-ui-button>`,
  }),
};

export const Component_Loading: ComponentStory = {
  args: {
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Loading Button</ds-ui-button>`,
  }),
};

export const Component_FullWidth: ComponentStory = {
  args: {
    fullWidth: true,
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 100%"><ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Full Width Button</ds-ui-button></div>`,
  }),
};
