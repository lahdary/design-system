import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, input, output, QueryList } from '@angular/core';
import { TabAnimationDirective } from './tab-animation.directive';
import { TabItemComponent } from './tab-item.component';

/**
 * Tab orientation
 * @property horizontal - Horizontal tabs layout (default)
 * @property vertical - Vertical tabs layout
 */
export type TabOrientation = 'horizontal' | 'vertical';

/**
 * Tab appearance
 * @property filled - Filled background tabs (default)
 * @property outlined - Outlined tabs
 * @property minimal - Text-only tabs with underline indicator
 */
export type TabAppearance = 'filled' | 'outlined' | 'minimal';

/**
 * Tab position (for horizontal tabs)
 * @property top - Tabs positioned above content (default)
 * @property bottom - Tabs positioned below content
 */
export type TabPosition = 'top' | 'bottom';

/**
 * Tabs component
 * 
 * A component for organizing and navigating between related content sections.
 * 
 * @example
 * ```html
 * <ds-ui-tabs>
 *   <ds-ui-tab-item title="Tab 1">Content for tab 1</ds-ui-tab-item>
 *   <ds-ui-tab-item title="Tab 2">Content for tab 2</ds-ui-tab-item>
 *   <ds-ui-tab-item title="Tab 3" [disabled]="true">Content for tab 3</ds-ui-tab-item>
 * </ds-ui-tabs>
 * ```
 */
@Component({
  selector: 'ds-ui-tabs',
  standalone: true,
  imports: [CommonModule, TabAnimationDirective],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  /**
   * Index of the active tab
   * @default 0
   */
  activeIndex = input<number>(0);

  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation = input<TabOrientation>('horizontal');

  /**
   * Appearance style of the tabs
   * @default 'filled'
   */
  appearance = input<TabAppearance>('filled');

  /**
   * Position of the tabs (for horizontal orientation)
   * @default 'top'
   */
  position = input<TabPosition>('top');

  /**
   * Whether tabs should be stretched to full width
   * @default false
   */
  stretch = input<boolean>(false);

  /**
   * Whether to show tab content animation
   * @default true
   */
  animated = input<boolean>(true);

  /**
   * Event emitted when the active tab changes
   */
  activeIndexChange = output<number>();

  @ContentChildren(TabItemComponent) 
  tabItems!: QueryList<TabItemComponent>;

  ngAfterContentInit() {
    // Initial setup
    this.selectTab(this.activeIndex());
    
    // Subscribe to changes in the tabs collection
    this.tabItems.changes.subscribe(() => {
      // If the active tab is no longer available, select the first tab
      if (!this.tabItems.get(this.activeIndex())) {
        this.selectTab(0);
      } else {
        // Refresh the active tab
        this.selectTab(this.activeIndex());
      }
    });
  }
  
  /**
   * Select a tab by index
   * @param index - The index of the tab to select
   */
  selectTab(index: number): void {
    // Validate index
    if (
      !this.tabItems || 
      index < 0 || 
      index >= this.tabItems.length ||
      this.tabItems.get(index)?.disabled()
    ) {
      return;
    }

    // Update the tabs' active state
    this.tabItems.forEach((tab, i) => {
      tab.active.set(i === index);
    });

    // Only emit if the index actually changed
    if (index !== this.activeIndex()) {
      // Don't try to set the input signal directly
      this.activeIndexChange.emit(index);
    }
  }
}
