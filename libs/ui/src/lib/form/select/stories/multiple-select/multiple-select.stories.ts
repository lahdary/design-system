import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SelectComponent } from '../../component/select.component';
import { MultipleSelectDirective } from '../../directives/multiple-select/multiple-select.directive';
import { SelectOption } from '../../select.types';

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

const meta: Meta<MultipleSelectDirective> = {
  title: 'Components/Form/Select/Multiple Select Directive',
  component: MultipleSelectDirective,
  decorators: [
    moduleMetadata({
      imports: [SelectComponent, MultipleSelectDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
          The Multiple Select Directive enhances the base Select Component with additional functionality 
          specifically for multiple selection scenarios. It adds support for:
          
          - Keeping the dropdown open after selection (for easier multiple selection)
          - Restricting the number of selections with maxSelections
          
          This directive should be applied to a SelectComponent with [multiple]="true".
        `,
      },
    },
  },
  argTypes: {
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether to close the dropdown after selecting an option',
    },
    maxSelections: {
      control: 'number',
      description:
        'Maximum number of selections allowed (undefined for unlimited)',
    },
  },
  args: {
    closeOnSelect: false,
    maxSelections: undefined,
  },
};

export default meta;
type Story = StoryObj<MultipleSelectDirective>;

// Basic multiple select story
export const BasicMultipleSelect: Story = {
  name: 'Basic Multiple Select',
  render: (args) => ({
    props: {
      ...args,
      options: sampleOptions,
      selectedValues: ['apple', 'orange'],
      selectionChange: (values: string[]) => {
        console.log('Selection changed:', values);
      },
    },
    template: `
      <div style="max-width: 300px; margin: 20px;">
        <h3>Multiple Select with Directive</h3>
        <div class="mt-2 mb-2">
          <strong>Current selection:</strong> {{ selectedValues.join(', ') || 'None' }}
        </div>
        <ds-select 
          [options]="options" 
          [(value)]="selectedValues"
          [multiple]="true"
          [placeholder]="'Select multiple fruits'"
          [searchable]="true"
          [clearable]="true"
          dsMultipleSelect
          [closeOnSelect]="closeOnSelect"
          [maxSelections]="maxSelections"
          (valueChange)="selectionChange($event)">
        </ds-select>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'A basic multiple select component with the dsMultipleSelect directive applied. The dropdown stays open after selection, allowing you to select multiple options without reopening the dropdown.',
      },
    },
  },
};

// With maximum selections
export const WithMaxSelections: Story = {
  name: 'With Maximum Selections',
  args: {
    maxSelections: 3,
  },
  render: (args) => ({
    props: {
      ...args,
      options: sampleOptions,
      selectedValues: ['apple', 'orange'],
      selectionChange: (values: string[]) => {
        console.log('Selection changed:', values);
      },
    },
    template: `
      <div style="max-width: 300px; margin: 20px;">
        <h3>Multiple Select with Max Selections</h3>
        <div class="mt-2 mb-2">
          <strong>Current selection:</strong> {{ selectedValues.join(', ') || 'None' }}
        </div>
        <p class="mt-2 mb-4">
          <em>You can select up to {{ maxSelections }} options</em>
        </p>
        <ds-select 
          [options]="options" 
          [(value)]="selectedValues"
          [multiple]="true"
          [placeholder]="'Select up to ' + maxSelections + ' fruits'"
          [searchable]="true"
          [clearable]="true"
          dsMultipleSelect
          [closeOnSelect]="closeOnSelect"
          [maxSelections]="maxSelections"
          (valueChange)="selectionChange($event)">
        </ds-select>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'A multiple select component that limits the number of selections to 3 using the maxSelections property of the dsMultipleSelect directive.',
      },
    },
  },
};

// Multiple select that closes after selection
export const CloseOnSelect: Story = {
  name: 'Close On Select',
  args: {
    closeOnSelect: true,
  },
  render: (args) => ({
    props: {
      ...args,
      options: sampleOptions,
      selectedValues: [],
    },
    template: `
      <div style="max-width: 300px; margin: 20px;">
        <h3>Multiple Select that Closes on Selection</h3>
        <div class="mt-2 mb-2">
          <strong>Current selection:</strong> {{ selectedValues.join(', ') || 'None' }}
        </div>
        <p class="mt-2 mb-4">
          <em>This dropdown will close after each selection</em>
        </p>
        <ds-select 
          [options]="options" 
          [(value)]="selectedValues"
          [multiple]="true"
          [placeholder]="'Select fruits'"
          dsMultipleSelect
          [closeOnSelect]="closeOnSelect"
          [maxSelections]="maxSelections">
        </ds-select>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'A multiple select component that closes the dropdown after each selection, using the closeOnSelect property set to true.',
      },
    },
  },
};
