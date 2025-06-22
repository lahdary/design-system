import { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from '../toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'Components/Form/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the toggle is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      description: 'The size of the toggle',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the toggle',
    },
    labelPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
      description: 'Position of the toggle label',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the toggle is required',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the toggle',
    },
    checkedChange: {
      action: 'checkedChange',
      description: 'Event emitted when the checked state changes',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component for enabling or disabling options.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Notifications enabled',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    loading: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required option',
    required: true,
  },
};

export const LeftLabel: Story = {
  args: {
    label: 'Left-positioned label',
    labelPosition: 'left',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ds-ui-toggle label="Small toggle" size="sm"></ds-ui-toggle>
        <ds-ui-toggle label="Medium toggle (default)" size="md"></ds-ui-toggle>
        <ds-ui-toggle label="Large toggle" size="lg"></ds-ui-toggle>
      </div>
    `,
  }),
};

export const LabelPositions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ds-ui-toggle label="Right label (default)" labelPosition="right"></ds-ui-toggle>
        <ds-ui-toggle label="Left label" labelPosition="left"></ds-ui-toggle>
      </div>
    `,
  }),
};

export const NoLabel: Story = {
  args: {
    ariaLabel: 'Toggle option',
  },
};
