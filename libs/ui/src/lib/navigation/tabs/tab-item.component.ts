import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Tab item component
 * 
 * A component representing an individual tab and its content.
 * This component is designed to be used as a child of the TabsComponent.
 * 
 * @example
 * ```html
 * <ds-ui-tab-item title="Profile" icon="person">
 *   User profile content goes here...
 * </ds-ui-tab-item>
 * ```
 */
@Component({
  selector: 'ds-ui-tab-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="ds-tab-content" 
      [class.ds-tab-content--active]="active()" 
      [class.ds-tab-content--animated]="animated()"
      role="tabpanel" 
      [attr.aria-hidden]="!active() ? true : null"
      [attr.id]="id"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .ds-tab-content {
      display: none;
      
      &--active {
        display: block;
      }
      
      &--animated {
        animation: tab-fade-in var(--transition-duration-normal) var(--transition-timing-function);
      }
    }
    
    @keyframes tab-fade-in {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabItemComponent {
  /**
   * Title of the tab
   * @required
   */
  title = input.required<string>();

  /**
   * Optional icon for the tab
   */
  icon = input<string>('');

  /**
   * Badge text/count to display on the tab
   */
  badge = input<string>('');

  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Whether the tab should show animation 
   * @default true
   */
  animated = input<boolean>(true);
  
  /**
   * ID for the tab content
   */
  id = `tab-content-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Whether the tab is currently active
   * @internal
   */
  active = signal(false);
}
