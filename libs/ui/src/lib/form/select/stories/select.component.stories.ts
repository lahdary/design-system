import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SelectComponent } from '../component/select.component';
import { SelectOption } from '../select.types';
// Sample options for all stories
const sampleOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry', group: 'Berries' },
  { value: 'raspberry', label: 'Raspberry', group: 'Berries' },
  { value: 'blackberry', label: 'Blackberry', group: 'Berries' },
  { value: 'mango', label: 'Mango', group: 'Tropical' },
  { value: 'pineapple', label: 'Pineapple', group: 'Tropical' },
  { value: 'papaya', label: 'Papaya', group: 'Tropical' },
];

const meta: Meta<SelectComponent> = {
  title: 'Components/Form/Select/Component',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
          The Select Component provides a customizable dropdown for selecting one or multiple options.
          
          ## Two-way Binding
          This component uses Angular's \`model()\` input for two-way binding of the \`value\` property.
          No need to manually handle valueChange events - changes to the selection are automatically
          reflected in the bound value.
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current selected value (two-way binding)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the select is in loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow selecting multiple options',
    },
    searchable: {
      control: 'boolean',
      description: 'Allow searching through options',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the select',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether selection can be cleared',
    },
    opened: {
      action: 'opened',
      description: 'Emitted when dropdown opens',
    },
    closed: {
      action: 'closed',
      description: 'Emitted when dropdown closes',
    },
    search: {
      action: 'search',
      description: 'Emitted when search text changes',
    },
  },
  args: {
    options: sampleOptions,
    placeholder: 'Select a fruit',
    value: null,
    disabled: false,
    loading: false,
    error: null,
    required: false,
    multiple: false,
    searchable: false,
    size: 'md',
    clearable: false,
    // Using Angular's model() for value, changes are automatically reflected
    opened: () => console.log('opened'),
    closed: () => console.log('closed'),
    search: (term: string) => console.log('search', term),
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

// Basic select - ensure dropdown opens and options are displayed
export const Basic: Story = {
  name: 'Basic Select',
  args: {
    // Initial value is null - after selection it will be automatically updated by model()
    value: null,
    // Set these to visualize when the dropdown is opening/closing
    opened: () => {
      console.log('Select opened - dropdown should be visible');
      // We don't need to do anything special here
    },
    closed: () => {
      console.log(
        'Select closed - dropdown should be hidden and selection should be shown'
      );
      // We don't need to do anything special here
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'A basic select component that allows selecting a single option. Click on the select to reveal the dropdown, then click an option to select it. The selected value will be displayed in the select control.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      // This tracks value changes for display
      valueChanged: function () {
        console.log('Value changed detection in story:', this['value']);
        return this['value']; // Return current value for reactivity
      },
    },
    template: `
      <div style="max-width: 300px; margin: 20px;">
        <h3>Basic Select Demo</h3>
        <div class="mt-2 mb-2">
          <strong>Current selection:</strong> {{ value }}
        </div>
        <ds-select 
          [options]="options" 
          [(value)]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [loading]="loading"
          [error]="error"
          [required]="required" 
          [multiple]="multiple"
          [searchable]="searchable"
          [size]="size"
          [clearable]="clearable"
          (opened)="opened()"
          (closed)="closed()">
        </ds-select>
      </div>
    `,
  }),
};

// With selected value
export const WithValue: Story = {
  name: 'With Selected Value',
  args: {
    value: 'banana',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select component initialized with a pre-selected value ("banana").',
      },
    },
  },
};

// Disabled select
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    value: 'apple',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select in disabled state - cannot be clicked or changed.',
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  name: 'Loading State',
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select displaying a loading indicator, useful when fetching options asynchronously.',
      },
    },
  },
};

// With error
export const WithError: Story = {
  name: 'With Error',
  args: {
    value: '',
    error: 'Please select a fruit',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select showing an error state with validation message.',
      },
    },
  },
};

// Multiple select
export const Multiple: Story = {
  name: 'Multiple Selection',
  args: {
    multiple: true,
    value: ['apple', 'orange'],
    opened: () => console.log('Multiple select dropdown opened'),
    closed: () => console.log('Multiple select dropdown closed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select that allows choosing multiple options simultaneously. The dropdown remains open after selection to allow selecting/deselecting multiple items. Changes to selections are automatically reflected in the bound value array.',
      },
    },
  },
};

// Searchable select
export const Searchable: Story = {
  name: 'Searchable',
  args: {
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select with built-in search functionality that filters options as you type.',
      },
    },
  },
};

// Small size
export const Small: Story = {
  name: 'Small Size',
  args: {
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'A smaller size variant of the select component.',
      },
    },
  },
};

// Large size
export const Large: Story = {
  name: 'Large Size',
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'A larger size variant of the select component.',
      },
    },
  },
};

// Clearable
export const Clearable: Story = {
  name: 'Clearable',
  args: {
    value: 'banana',
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select with an option to clear the current selection using a dedicated clear button.',
      },
    },
  },
};

// With all features
export const FullFeatured: Story = {
  name: 'Full-featured',
  args: {
    multiple: true,
    searchable: true,
    clearable: true,
    value: ['apple', 'orange'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select component with all features enabled: multiple selection, search functionality, and clearable selection.',
      },
    },
  },
};

// Debug Click Events
export const DebugClickEvents: Story = {
  name: 'Debug Click Events',
  args: {
    value: null,
    opened: () => console.log('Select opened - testing click events'),
    closed: () => console.log('Select closed - testing click events'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A story specifically designed for debugging click events on the options.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      logChange: (val: any) => {
        console.log('Value changed to:', val);
        return val;
      },
    },
    template: `
      <div style="max-width: 300px; margin: 20px;">
        <h3>Click Event Debugging</h3>
        <div class="mt-2 mb-2">
          <strong>Current selection:</strong> {{ value ? (Array.isArray(value) ? value.join(', ') : value) : 'None' }}
        </div>
        <ds-select 
          [options]="options" 
          [(value)]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [loading]="loading"
          [error]="error"
          [required]="required" 
          [multiple]="multiple"
          [searchable]="searchable"
          [size]="size"
          [clearable]="clearable"
          (opened)="opened()"
          (closed)="closed()">
        </ds-select>
        <div class="mt-3 p-3 border" style="background-color: #f8f9fa;">
          <p><strong>Instructions:</strong></p>
          <ol>
            <li>Click on the select to open the dropdown</li>
            <li>Click on an option and check console for logs</li>
            <li>Check if the selection updates above</li>
          </ol>
        </div>
      </div>
    `,
  }),
};
