import { CommonModule } from '@angular/common';
import type { Preview } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
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

    // Apply the showcase wrapper
    componentWrapperDecorator((story) => {
      // Try to get story context from data attribute
      let storyContext;
      try {
        const contextAttr =
          document.documentElement.getAttribute('data-story-context');
        storyContext = contextAttr ? JSON.parse(contextAttr) : {};
      } catch (e) {
        storyContext = {};
      }

      // Extract component name and category from the title (e.g., "Components/Button" -> "Button")
      const titleParts = (storyContext.title || '').split('/');
      const componentName = titleParts[titleParts.length - 1] || 'Component';
      const category = titleParts[0] || '';
      const name = storyContext.name || 'Default';
      const description = storyContext.description || '';

      // Determine component status based on category or name
      const getComponentStatus = () => {
        const lowerName = componentName.toLowerCase();
        const lowerCategory = category.toLowerCase();

        // Detect experimental components
        if (
          lowerName.includes('experimental') ||
          lowerCategory.includes('experimental') ||
          name.includes('Experimental')
        ) {
          return { type: 'experimental', label: 'Experimental' };
        }

        // Detect beta components
        if (
          lowerName.includes('beta') ||
          lowerCategory.includes('beta') ||
          name.includes('Beta')
        ) {
          return { type: 'beta', label: 'Beta' };
        }

        // Default to stable
        return { type: 'stable', label: 'Stable' };
      };

      const status = getComponentStatus();

      // Format description for better display
      const shortDescription =
        description && description.length > 120
          ? description.substring(0, 120) + '...'
          : description;

      // Create our custom showcase wrapper with professional metadata
      return `
        <div class="ds-showcase-wrapper">
          <div class="ds-showcase-gradient"></div>
          <div class="ds-showcase-grid"></div>
          
          <div class="ds-showcase-header">
            <div>
              <h3 class="ds-showcase-title">
                ${componentName}${name !== 'Default' ? ` / ${name}` : ''}
                ${
                  category
                    ? `<span class="ds-showcase-category">${category}</span>`
                    : ''
                }
                <span class="ds-showcase-info-icon" title="Component: ${componentName}${
        description ? '\n\n' + description : ''
      }">i</span>
              </h3>
              ${
                shortDescription
                  ? `<div class="ds-showcase-component-info">${shortDescription}</div>`
                  : ''
              }
            </div>
            
            <div class="ds-showcase-status">
              <span class="ds-showcase-status-badge ${status.type}">${
        status.label
      }</span>
            </div>
          </div>
          
          <div class="ds-showcase-content">
            ${story}
          </div>
          
          <div class="ds-showcase-actions">
            <button class="ds-showcase-action-btn" onclick="document.querySelector('.ds-showcase-wrapper').classList.toggle('loading')">Toggle State</button>
            <button class="ds-showcase-action-btn" onclick="alert('Component: ${componentName}\\nStatus: ${
        status.label
      }\\nCategory: ${category}')">Info</button>
          </div>
        </div>
      `;
    }),
  ],
};

export default preview;
