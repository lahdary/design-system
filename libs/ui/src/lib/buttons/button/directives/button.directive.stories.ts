import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonDirective } from './button.directive';
import { IconButtonDirective } from './icon-button.directive';

export default {
  title: 'Directives/Button',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonDirective, IconButtonDirective],
    }),
  ],
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => ({
    template: `
      <button dsUiButton>Primary Button</button>
      <button dsUiButton variant="secondary">Secondary Button</button>
      <button dsUiButton [disabled]="true">Disabled Button</button>
    `,
  }),
};

export const IconButton: Story = {
  render: () => ({
    template: `
      <button dsUiIconButton ariaLabel="Add item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      
      <button dsUiIconButton color="secondary" ariaLabel="Edit item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
      
      <button dsUiIconButton [disabled]="true" ariaLabel="Delete item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
      </button>
    `,
  }),
};
