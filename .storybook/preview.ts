import { CommonModule } from '@angular/common';
import type { Preview } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../libs/ui/src/lib';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, // Import CommonModule for Angular directives
        ButtonComponent,
        // Import any global modules or components here
        // For example, if you have a shared module:
        // SharedModule,
      ],
    }),
    (Story, context) => {
      const { theme } = context.globals;

      // Apply theme to document
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      // Also add theme class to the body for legacy support
      document.body.className = `theme-${theme}`;

      // Store story context in a data attribute for our componentWrapperDecorator
      const storyData = {
        title: context.title || '',
        name: context.name || 'Default',
        description: context.parameters?.docs?.description?.component || '',
      };
      document.documentElement.setAttribute(
        'data-story-context',
        JSON.stringify(storyData)
      );

      return Story();
    },
    // Custom showcase decorator - using componentWrapperDecorator for Angular compatibility
    (Story, context) => {
      // Apply theme before rendering
      const { theme } = context.globals;
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      return Story();
    },
  ],
};

export default preview;
