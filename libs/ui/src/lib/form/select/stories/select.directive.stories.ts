import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, StoryObj } from '@storybook/angular';
import { SelectDirective } from '../directive/select.directive';
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

// Wrapper component to handle ngModel binding
@Component({
  selector: 'ds-select-directive-story',
  template: `
    <div>
      <select
        ds-ui-select
        [options]="options"
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [loading]="loading"
        [error]="error"
        [required]="required"
        [multiple]="multiple"
        [size]="size"
        (valueChange)="onValueChange($event)"
        [(ngModel)]="modelValue"
      ></select>

      <div class="story-details">
        <p><strong>Model Value:</strong> {{ modelValue }}</p>
        <p><strong>Event Value:</strong> {{ eventValue }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .story-details {
        margin-top: 20px;
        padding: 15px;
        background-color: #f5f5f5;
        border-radius: 4px;
      }
    `,
  ],
  standalone: true,
  imports: [SelectDirective, FormsModule],
})
class SelectDirectiveStoryComponent {
  options: SelectOption[] = sampleOptions;
  value: string | string[] | null = null;
  placeholder = 'Select a fruit';
  disabled = false;
  loading = false;
  error: string | null = null;
  required = false;
  multiple = false;
  size = 'md';

  modelValue: any = null;
  eventValue: any = null;

  onValueChange(value: any) {
    this.eventValue = value;
    console.log('valueChange', value);
  }
}

const meta: Meta<SelectDirectiveStoryComponent> = {
  title: 'Components/Form/Select/Directive',
  component: SelectDirectiveStoryComponent,
  argTypes: {
    value: {
      control: 'text',
      description: 'Current selected value',
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the select',
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
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<SelectDirectiveStoryComponent>;

// Basic select
export const Basic: Story = {
  name: 'Basic Select',
  args: {},
};

// With selected value
export const WithValue: Story = {
  name: 'With Selected Value',
  args: {
    value: 'banana',
  },
};

// Disabled select
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    value: 'apple',
  },
};

// Loading state
export const Loading: Story = {
  name: 'Loading State',
  args: {
    loading: true,
  },
};

// With error
export const WithError: Story = {
  name: 'With Error',
  args: {
    value: '',
    error: 'Please select a fruit',
  },
};

// Multiple select
export const Multiple: Story = {
  name: 'Multiple Selection',
  args: {
    multiple: true,
    value: ['apple', 'orange'],
  },
};

// Small size
export const Small: Story = {
  name: 'Small Size',
  args: {
    size: 'sm',
  },
};

// Large size
export const Large: Story = {
  name: 'Large Size',
  args: {
    size: 'lg',
  },
};
