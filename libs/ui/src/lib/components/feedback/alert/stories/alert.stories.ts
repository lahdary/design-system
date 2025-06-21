import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AlertComponent } from '../alert.component';

/**
 * # Alert
 * 
 * Alerts display short messages that communicate status or provide feedback.
 * 
 * ## Features
 * 
 * - Four variants: info, success, warning, and error
 * - Optional title
 * - Dismissible option
 * - Optional icon
 * - Solid or subtle background
 * - Optional border and elevation
 */
export default {
  title: 'Components/Alert',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [AlertComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style of the alert',
      defaultValue: 'info'
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title text for the alert'
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be dismissed',
      defaultValue: false
    },
    hasIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show an icon',
      defaultValue: true
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Whether to show a border',
      defaultValue: true
    },
    solid: {
      control: { type: 'boolean' },
      description: 'Whether to use a solid background color',
      defaultValue: false
    },
    elevated: {
      control: { type: 'boolean' },
      description: 'Whether to add a subtle shadow',
      defaultValue: false
    }
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert components are used to display important messages to users.'
      }
    }
  },
} as Meta<AlertComponent>;

type Story = StoryObj<AlertComponent>;

/**
 * Default information alert.
 */
export const Info: Story = {
  render: (args) => ({
    props: {
      ...args,
      message: 'This is an information alert with useful details for the user.'
    },
    template: `
      <ds-ui-alert 
        [variant]="variant" 
        [title]="title" 
        [dismissible]="dismissible" 
        [hasIcon]="hasIcon"
        [bordered]="bordered"
        [solid]="solid"
        [elevated]="elevated">
        {{message}}
      </ds-ui-alert>
    `
  }),
  args: {
    variant: 'info',
    title: 'Information',
    dismissible: true,
    hasIcon: true,
    bordered: true,
    solid: false,
    elevated: false
  }
};

/**
 * Success alert to confirm an action completed successfully.
 */
export const Success: Story = {
  render: (args) => ({
    props: {
      ...args,
      message: 'Your action was completed successfully.'
    },
    template: `
      <ds-ui-alert 
        [variant]="variant" 
        [title]="title" 
        [dismissible]="dismissible" 
        [hasIcon]="hasIcon"
        [bordered]="bordered"
        [solid]="solid"
        [elevated]="elevated">
        {{message}}
      </ds-ui-alert>
    `
  }),
  args: {
    variant: 'success',
    title: 'Success',
    dismissible: true,
    hasIcon: true,
    bordered: true,
    solid: false,
    elevated: false
  }
};

/**
 * Warning alert to indicate potential issues.
 */
export const Warning: Story = {
  render: (args) => ({
    props: {
      ...args,
      message: 'Please be aware of this important warning before proceeding.'
    },
    template: `
      <ds-ui-alert 
        [variant]="variant" 
        [title]="title" 
        [dismissible]="dismissible" 
        [hasIcon]="hasIcon"
        [bordered]="bordered"
        [solid]="solid"
        [elevated]="elevated">
        {{message}}
      </ds-ui-alert>
    `
  }),
  args: {
    variant: 'warning',
    title: 'Warning',
    dismissible: true,
    hasIcon: true,
    bordered: true,
    solid: false,
    elevated: false
  }
};

/**
 * Error alert to communicate problems.
 */
export const Error: Story = {
  render: (args) => ({
    props: {
      ...args,
      message: 'An error occurred while processing your request. Please try again.'
    },
    template: `
      <ds-ui-alert 
        [variant]="variant" 
        [title]="title" 
        [dismissible]="dismissible" 
        [hasIcon]="hasIcon"
        [bordered]="bordered"
        [solid]="solid"
        [elevated]="elevated">
        {{message}}
      </ds-ui-alert>
    `
  }),
  args: {
    variant: 'error',
    title: 'Error',
    dismissible: true,
    hasIcon: true,
    bordered: true,
    solid: false,
    elevated: false
  }
};

/**
 * Solid background variant.
 */
export const Solid: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ds-ui-alert 
          variant="info" 
          [solid]="true"
          [hasIcon]="true">
          This is a solid info alert.
        </ds-ui-alert>

        <ds-ui-alert 
          variant="success" 
          [solid]="true"
          [hasIcon]="true">
          This is a solid success alert.
        </ds-ui-alert>

        <ds-ui-alert 
          variant="warning" 
          [solid]="true"
          [hasIcon]="true">
          This is a solid warning alert.
        </ds-ui-alert>

        <ds-ui-alert 
          variant="error" 
          [solid]="true"
          [hasIcon]="true">
          This is a solid error alert.
        </ds-ui-alert>
      </div>
    `
  })
};
