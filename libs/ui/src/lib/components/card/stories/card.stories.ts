import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent } from '../card.component';
import { ButtonComponent } from '../../buttons/button';

/**
 * # Card
 * 
 * Cards are used to group and display content in a way that's easily readable.
 * 
 * ## Features
 * 
 * - Multiple elevation options
 * - Configurable border radius
 * - Optional border
 * - Interactive state for clickable cards
 * - Header, body, and footer sections
 */
export default {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CardComponent,
        CardHeaderComponent,
        CardBodyComponent,
        CardFooterComponent,
        ButtonComponent
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3],
      description: 'The elevation level of the card',
      defaultValue: 2
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'The border radius of the card',
      defaultValue: 'md'
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding size for the card',
      defaultValue: 'md'
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Whether to show a border around the card',
      defaultValue: false
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Whether the card has interactive hover effects',
      defaultValue: false
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the card extends to its container width',
      defaultValue: false
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component with configurable elevation, border radius, and padding.'
      }
    }
  },
} as Meta<CardComponent>;

type Story = StoryObj<CardComponent>;

/**
 * Basic card with header, body and footer sections.
 */
export const Basic: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <ds-ui-card [elevation]="elevation" [radius]="radius" [padding]="padding" [bordered]="bordered" [interactive]="interactive" [fullWidth]="fullWidth" style="width: 300px;">
        <ds-ui-card-header>
          <h3 style="margin: 0; font-weight: 500;">Card Title</h3>
        </ds-ui-card-header>
        <ds-ui-card-body>
          <p style="margin: 0;">
            This is a basic card component with customizable properties.
            The content can be adjusted to fit various use cases.
          </p>
        </ds-ui-card-body>
        <ds-ui-card-footer>
          <ds-ui-button variant="primary">Action</ds-ui-button>
        </ds-ui-card-footer>
      </ds-ui-card>
    `
  }),
  args: {
    elevation: 2,
    radius: 'md',
    padding: 'md',
    bordered: false,
    interactive: false,
    fullWidth: false
  }
};

/**
 * Interactive card with hover effects.
 */
export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <ds-ui-card [elevation]="elevation" [radius]="radius" [padding]="padding" [bordered]="bordered" [interactive]="interactive" [fullWidth]="fullWidth" style="width: 300px;">
        <ds-ui-card-body>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background-color: var(--color-primary); display: flex; align-items: center; justify-content: center; color: white;">
              <span>→</span>
            </div>
            <div>
              <h4 style="margin: 0; margin-bottom: 4px;">Interactive Card</h4>
              <p style="margin: 0; font-size: 14px;">Click to perform an action</p>
            </div>
          </div>
        </ds-ui-card-body>
      </ds-ui-card>
    `
  }),
  args: {
    elevation: 1,
    radius: 'md',
    padding: 'md',
    bordered: false,
    interactive: true,
    fullWidth: false
  }
};

/**
 * Different elevation variants.
 */
export const Elevations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: center;">
        <ds-ui-card elevation="0" radius="md" padding="md" [bordered]="true" style="width: 300px;">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Elevation 0</p>
          </ds-ui-card-body>
        </ds-ui-card>
        
        <ds-ui-card elevation="1" radius="md" padding="md" style="width: 300px;">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Elevation 1</p>
          </ds-ui-card-body>
        </ds-ui-card>
        
        <ds-ui-card elevation="2" radius="md" padding="md" style="width: 300px;">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Elevation 2</p>
          </ds-ui-card-body>
        </ds-ui-card>
        
        <ds-ui-card elevation="3" radius="md" padding="md" style="width: 300px;">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Elevation 3</p>
          </ds-ui-card-body>
        </ds-ui-card>
      </div>
    `
  })
};

/**
 * Different border radius variants.
 */
export const BorderRadius: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
        <ds-ui-card elevation="1" radius="none" padding="md">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">No Radius</p>
          </ds-ui-card-body>
        </ds-ui-card>
        
        <ds-ui-card elevation="1" radius="sm" padding="md">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Small Radius</p>
          </ds-ui-card-body>
        </ds-ui-card>
        
        <ds-ui-card elevation="1" radius="md" padding="md">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Medium Radius</p>
          </ds-ui-card-body>
        </ds-ui-card>
        
        <ds-ui-card elevation="1" radius="lg" padding="md">
          <ds-ui-card-body>
            <p style="margin: 0; font-weight: 500; text-align: center;">Large Radius</p>
          </ds-ui-card-body>
        </ds-ui-card>
      </div>
    `
  })
};
