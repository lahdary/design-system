import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TabItemComponent } from '../tab-item.component';
import { TabsComponent } from '../tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Navigation/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TabsComponent, TabItemComponent],
    }),
  ],
  argTypes: {
    activeIndex: {
      control: { type: 'number', min: 0 },
      description: 'Index of the active tab',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      description: 'Orientation of the tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    appearance: {
      options: ['filled', 'outlined', 'minimal'],
      control: { type: 'radio' },
      description: 'Appearance style of the tabs',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    position: {
      options: ['top', 'bottom'],
      control: { type: 'radio' },
      description: 'Position of the tabs (for horizontal orientation)',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    stretch: {
      control: 'boolean',
      description: 'Whether tabs should be stretched to full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Whether to show tab content animation',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    activeIndexChange: {
      action: 'activeIndexChange',
      description: 'Event emitted when the active tab changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A tabs component that provides a tabbed interface for navigating between related content sections.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-ui-tabs
        [activeIndex]="activeIndex"
        [orientation]="orientation"
        [appearance]="appearance"
        [position]="position"
        [stretch]="stretch"
        [animated]="animated"
        (activeIndexChange)="activeIndexChange($event)">
        <ds-ui-tab-item title="Home" icon="home">
          <h3>Home Tab Content</h3>
          <p>This is the content for the Home tab. You can put any content here.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Profile" icon="person">
          <h3>Profile Tab Content</h3>
          <p>This is the content for the Profile tab. Here you would typically display user profile information.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Messages" icon="mail" badge="3">
          <h3>Messages Tab Content</h3>
          <p>This is the content for the Messages tab. Here you would typically display messaging features.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Settings" icon="settings" [disabled]="true">
          <h3>Settings Tab Content</h3>
          <p>This tab is disabled and should not be accessible.</p>
        </ds-ui-tab-item>
      </ds-ui-tabs>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
  args: {
    activeIndex: 0,
    orientation: 'horizontal',
    appearance: 'filled',
    position: 'top',
    stretch: false,
    animated: true,
  },
};

export const AppearanceStyles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3>Filled (default)</h3>
          <ds-ui-tabs appearance="filled">
            <ds-ui-tab-item title="Tab 1">Content for Tab 1</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 2">Content for Tab 2</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 3">Content for Tab 3</ds-ui-tab-item>
          </ds-ui-tabs>
        </div>
        
        <div>
          <h3>Outlined</h3>
          <ds-ui-tabs appearance="outlined">
            <ds-ui-tab-item title="Tab 1">Content for Tab 1</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 2">Content for Tab 2</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 3">Content for Tab 3</ds-ui-tab-item>
          </ds-ui-tabs>
        </div>
        
        <div>
          <h3>Minimal</h3>
          <ds-ui-tabs appearance="minimal">
            <ds-ui-tab-item title="Tab 1">Content for Tab 1</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 2">Content for Tab 2</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 3">Content for Tab 3</ds-ui-tab-item>
          </ds-ui-tabs>
        </div>
      </div>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};

export const Orientations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3>Horizontal (default)</h3>
          <ds-ui-tabs orientation="horizontal">
            <ds-ui-tab-item title="Tab 1">Content for Tab 1</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 2">Content for Tab 2</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 3">Content for Tab 3</ds-ui-tab-item>
          </ds-ui-tabs>
        </div>
        
        <div>
          <h3>Vertical</h3>
          <ds-ui-tabs orientation="vertical" style="height: 200px;">
            <ds-ui-tab-item title="Tab 1">Content for Tab 1</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 2">Content for Tab 2</ds-ui-tab-item>
            <ds-ui-tab-item title="Tab 3">Content for Tab 3</ds-ui-tab-item>
          </ds-ui-tabs>
        </div>
      </div>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <ds-ui-tabs>
        <ds-ui-tab-item title="Home" icon="home">
          <h3>Home Tab Content</h3>
          <p>This is the content for the Home tab.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Profile" icon="person">
          <h3>Profile Tab Content</h3>
          <p>This is the content for the Profile tab.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Settings" icon="settings">
          <h3>Settings Tab Content</h3>
          <p>This is the content for the Settings tab.</p>
        </ds-ui-tab-item>
      </ds-ui-tabs>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};

export const WithBadges: Story = {
  render: () => ({
    template: `
      <ds-ui-tabs>
        <ds-ui-tab-item title="Inbox" icon="inbox" badge="5">
          <h3>Inbox Tab Content</h3>
          <p>You have 5 unread messages.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Updates" icon="update" badge="2">
          <h3>Updates Tab Content</h3>
          <p>You have 2 pending updates.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Tasks" icon="task">
          <h3>Tasks Tab Content</h3>
          <p>No pending tasks.</p>
        </ds-ui-tab-item>
      </ds-ui-tabs>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};

export const DisabledTabs: Story = {
  render: () => ({
    template: `
      <ds-ui-tabs>
        <ds-ui-tab-item title="Active Tab">
          <p>This tab is active and clickable.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Disabled Tab" [disabled]="true">
          <p>This content should not be visible because the tab is disabled.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Another Active Tab">
          <p>This is another active tab.</p>
        </ds-ui-tab-item>
      </ds-ui-tabs>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};

export const BottomPositioned: Story = {
  render: () => ({
    template: `
      <ds-ui-tabs position="bottom">
        <ds-ui-tab-item title="Tab 1">
          <h3>Tab 1 Content</h3>
          <p>This is the content for Tab 1, with tabs positioned at the bottom.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Tab 2">
          <h3>Tab 2 Content</h3>
          <p>This is the content for Tab 2, with tabs positioned at the bottom.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Tab 3">
          <h3>Tab 3 Content</h3>
          <p>This is the content for Tab 3, with tabs positioned at the bottom.</p>
        </ds-ui-tab-item>
      </ds-ui-tabs>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};

export const StretchedTabs: Story = {
  render: () => ({
    template: `
      <ds-ui-tabs [stretch]="true">
        <ds-ui-tab-item title="Tab 1">
          <h3>Tab 1 Content</h3>
          <p>This tab uses full width of its container.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Tab 2">
          <h3>Tab 2 Content</h3>
          <p>This tab uses full width of its container.</p>
        </ds-ui-tab-item>
        <ds-ui-tab-item title="Tab 3">
          <h3>Tab 3 Content</h3>
          <p>This tab uses full width of its container.</p>
        </ds-ui-tab-item>
      </ds-ui-tabs>
    `,
    imports: [TabsComponent, TabItemComponent],
  }),
};
