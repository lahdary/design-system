import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SelectComponent } from '../../component/select.component';
import { MultipleSelectDirective } from '../../directives/multiple-select/multiple-select.directive';

const meta: Meta<SelectComponent> = {
  title: 'Components/Form/Select/Integration Examples',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectComponent, MultipleSelectDirective, CommonModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
          Examples showing how to integrate the SelectComponent with directives like MultipleSelectDirective.
          These examples demonstrate the component composition approach used throughout the design system.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

// Basic integration example
export const MultipleSelectWithDirective: Story = {
  render: () => ({
    template: `
      <div style="max-width: 300px; margin: 20px;">
        <h3>Multiple Select Integration</h3>
        <p class="mb-2">Select component with multiple selection directive applied:</p>
        
        <ds-select
          [options]="options"
          [(value)]="selectedValues" 
          [multiple]="true"
          [placeholder]="'Select fruits'"
          [searchable]="true"
          [clearable]="true"
          dsMultipleSelect
          [closeOnSelect]="closeOnSelect"
          [maxSelections]="maxSelections"
          #multipleSelect="dsMultipleSelect"
          class="mb-4"
        ></ds-select>
        
        <div class="mt-3 mb-3">
          <strong>Selected values:</strong> 
          <span *ngIf="selectedValues.length">{{ selectedValues.join(', ') }}</span>
          <span *ngIf="!selectedValues.length">None</span>
        </div>
        
        <div class="mb-2">
          <label>
            <input type="checkbox" [(ngModel)]="closeOnSelect"> Close on select
          </label>
        </div>
        
        <div class="mb-2">
          <label>
            Max selections:
            <select [(ngModel)]="maxSelections">
              <option [ngValue]="undefined">No limit</option>
              <option [ngValue]="1">1</option>
              <option [ngValue]="2">2</option>
              <option [ngValue]="3">3</option>
              <option [ngValue]="5">5</option>
            </select>
          </label>
        </div>
        
        <button (click)="selectedValues = []" class="mt-2">Clear All</button>
      </div>
    `,
    props: {
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'orange', label: 'Orange' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'blueberry', label: 'Blueberry', group: 'Berries' },
        { value: 'raspberry', label: 'Raspberry', group: 'Berries' },
      ],
      selectedValues: ['apple', 'orange'],
      closeOnSelect: false,
      maxSelections: 3,
    },
  }),
  parameters: {
    docs: {
      description: {
        story: `
          This example demonstrates how the SelectComponent integrates with the MultipleSelectDirective.
          
          Key features:
          - The \`dsMultipleSelect\` directive is applied to the select component
          - The \`closeOnSelect\` property controls whether the dropdown closes after selection
          - The \`maxSelections\` property limits the number of items that can be selected
          - The directive is exposed via template reference variable \`#multipleSelect="dsMultipleSelect"\`
        `,
      },
    },
  },
};
