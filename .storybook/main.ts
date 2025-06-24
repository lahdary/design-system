import type { StorybookConfig } from '@storybook/angular';

// Extended Storybook configuration type to support newer features
type CustomStorybookConfig = StorybookConfig & {
  features?: {
    buildStoriesJson?: boolean;
  };
  docs?: {
    autodocs?: boolean | 'tag';
  };
};

const config: CustomStorybookConfig = {
  stories: [
    '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../libs/ui/src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  // For Storybook v9, docs configuration is different
  // features: {
  //   buildStoriesJson: true
  // },
  docs: {
    autodocs: true,
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
