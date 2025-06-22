/**
 * Table types
 *
 * This file contains all type definitions related to tables that can be used
 * across components, directives, and other parts of the application.
 */

/**
 * Table size variants
 * @property sm - Small table
 * @property md - Medium table (default)
 * @property lg - Large table
 */
export type TableSize = 'sm' | 'md' | 'lg';

/**
 * Table density options
 * @property compact - Compact row spacing
 * @property default - Default row spacing
 * @property spacious - Spacious row spacing
 */
export type TableDensity = 'compact' | 'default' | 'spacious';

/**
 * Table border style
 * @property none - No borders
 * @property horizontal - Only horizontal borders
 * @property vertical - Only vertical borders
 * @property all - All borders (grid)
 */
export type TableBorderStyle = 'none' | 'horizontal' | 'vertical' | 'all';

/**
 * Sort direction for columns
 * @property asc - Ascending order
 * @property desc - Descending order
 * @property none - No sorting
 */
export type SortDirection = 'asc' | 'desc' | 'none';

/**
 * Sort event data
 */
export interface SortEvent {
  columnId: string;
  direction: SortDirection;
}

/**
 * Base table properties interface
 * Common properties shared between table component and directives
 */
export interface TableProps {
  /**
   * Table size
   * @default 'md'
   */
  size?: TableSize;

  /**
   * Table density
   * @default 'default'
   */
  density?: TableDensity;

  /**
   * Border style
   * @default 'horizontal'
   */
  border?: TableBorderStyle;

  /**
   * Whether the table has striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Whether table rows have hover effects
   * @default true
   */
  hover?: boolean;
}
