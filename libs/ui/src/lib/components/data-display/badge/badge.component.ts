import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge variants
 * @property primary - Primary badge
 * @property secondary - Secondary badge
 * @property success - Success badge
 * @property warning - Warning badge
 * @property error - Error badge
 * @property info - Info badge
 */
export type BadgeVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

/**
 * Badge size variants
 * @property sm - Small badge
 * @property md - Medium badge (default)
 * @property lg - Large badge
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge component
 * 
 * A versatile badge component used to highlight or categorize items.
 * 
 * @example
 * ```html
 * <ds-ui-badge variant="primary">New</ds-ui-badge>
 * <ds-ui-badge variant="success" size="sm">Active</ds-ui-badge>
 * <ds-ui-badge variant="error" [outline]="true">Critical</ds-ui-badge>
 * ```
 */
@Component({
  selector: 'ds-ui-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  /**
   * Badge variant
   * @default 'primary'
   */
  readonly variant = input<BadgeVariant>('primary');

  /**
   * Badge size
   * @default 'md'
   */
  readonly size = input<BadgeSize>('md');
  
  /**
   * Whether to display the badge with an outline style
   * @default false
   */
  readonly outline = input<boolean>(false);
  
  /**
   * Whether the badge is rounded (pill-shaped)
   * @default false
   */
  readonly rounded = input<boolean>(false);
  
  /**
   * Custom icon to display before the content
   * Uses Material Icons
   */
  readonly icon = input<string | null>(null);
}
