/**
 * Select component types
 *
 * This file contains all type definitions related to select/dropdown that can be used
 * across component, directive, and other parts of the application.
 */

/**
 * Option interface for select components
 */
export interface SelectOption {
  /** Unique identifier or value for the option */
  value: string;

  /** Display text for the option */
  label: string;

  /** Whether the option is disabled */
  disabled?: boolean;

  /** Optional group name for grouping options */
  group?: string;
}

/**
 * Select size variants
 */
export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Select value types
 */
export type SelectValue = string | string[] | null;

/**
 * Base select properties interface
 * Common properties shared between select component and directive
 */
export interface SelectProps {
  /**
   * Array of options to display
   */
  options?: SelectOption[];

  /**
   * Current selected value(s)
   */
  value?: SelectValue;

  /**
   * Placeholder text when no option is selected
   * @default 'Select an option'
   */
  placeholder?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Error message to display
   */
  error?: string | null;

  /**
   * Whether selection is required
   * @default false
   */
  required?: boolean;

  /**
   * Allow multiple selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Enable search functionality
   * @default false
   */
  searchable?: boolean;

  /**
   * Size of the select
   * @default 'md'
   */
  size?: SelectSize;

  /**
   * Allow clearing the selection
   * @default false
   */
  clearable?: boolean;
}
