import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { TextInputComponent } from '../text-input.component';

const meta: Meta<TextInputComponent> = {
  title: 'Components/Form/TextInput',
  component: TextInputComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      description: 'The size of the text input',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      options: ['default', 'success', 'error', 'warning'],
      control: { type: 'radio' },
      description: 'The status of the text input',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the text input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the text input is readonly',
    },
    required: {
      control: 'boolean',
      description: 'Whether the text input is required',
    },
    type: {
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      control: { type: 'select' },
      description: 'The type of the text input',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      control: 'text',
      description: 'The label of the text input',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder of the text input',
    },
    helperText: {
      control: 'text',
      description: 'The helper text of the text input',
    },
    errorMessage: {
      control: 'text',
      description: 'The error message of the text input',
    },
    value: {
      control: 'text',
      description: 'The value of the text input',
    },
  },
  args: {
    size: 'md',
    status: 'default',
    disabled: false,
    readonly: false,
    required: false,
    type: 'text',
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: '',
    errorMessage: '',
    value: '',
  },
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="max-width: 400px; margin: 3em;">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<TextInputComponent>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    status: 'error',
    errorMessage: 'Password must be at least 8 characters long.',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    status: 'success',
    helperText: 'Username is available!',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Address',
    value: '123 Main St',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'User ID',
    value: 'USR-12345',
    readonly: true,
    helperText: 'This field cannot be modified',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ds-ui-text-input
          label="Default Input"
          placeholder="Default state"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Success State"
          placeholder="Success state"
          status="success"
          helperText="This input has been validated successfully"
          value="Correct value"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Error State"
          placeholder="Error state"
          status="error"
          errorMessage="This field has an error"
          value="Incorrect value"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Warning State"
          placeholder="Warning state"
          status="warning"
          helperText="This field needs attention"
          value="Questionable value"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Disabled Input"
          placeholder="Disabled state"
          disabled="true"
          value="Cannot be edited"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Required Input"
          placeholder="Required field"
          required="true"
        ></ds-ui-text-input>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ds-ui-text-input
          label="Small Input"
          placeholder="Small size"
          size="sm"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Medium Input"
          placeholder="Medium size"
          size="md"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Large Input"
          placeholder="Large size"
          size="lg"
        ></ds-ui-text-input>
      </div>
    `,
  }),
};

export const InputTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ds-ui-text-input
          label="Text Input"
          placeholder="Regular text"
          type="text"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Email Input"
          placeholder="Enter email address"
          type="email"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Password Input"
          placeholder="Enter password"
          type="password"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Number Input"
          placeholder="Enter a number"
          type="number"
        ></ds-ui-text-input>
        
        <ds-ui-text-input
          label="Telephone Input"
          placeholder="Enter phone number"
          type="tel"
        ></ds-ui-text-input>
      </div>
    `,
  }),
};
