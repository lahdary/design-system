import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonDirective } from '../directives/button.directive';

// Directive stories
const directiveMeta: Meta<ButtonDirective> = {
  title: 'Components/Button/Directive',
  component: ButtonDirective,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonDirective],
    }),
  ],
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

export default directiveMeta;
type DirectiveStory = StoryObj<ButtonDirective>;

export const Directive_Primary: DirectiveStory = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Primary Button</button>`,
  }),
};

export const Directive_Secondary: DirectiveStory = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Secondary Button</button>`,
  }),
};

export const Directive_Tertiary: DirectiveStory = {
  args: {
    variant: 'tertiary',
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Tertiary Button</button>`,
  }),
};

export const Directive_Small: DirectiveStory = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Small Button</button>`,
  }),
};

export const Directive_Medium: DirectiveStory = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Medium Button</button>`,
  }),
};

export const Directive_Large: DirectiveStory = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Large Button</button>`,
  }),
};

export const Directive_Disabled: DirectiveStory = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Disabled Button</button>`,
  }),
};

export const Directive_Loading: DirectiveStory = {
  args: {
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `<button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Loading Button</button>`,
  }),
};

export const Directive_FullWidth: DirectiveStory = {
  args: {
    fullWidth: true,
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 100%"><button ds-ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel" [type]="type" (clicked)="clicked($event)">Full Width Button</button></div>`,
  }),
};
