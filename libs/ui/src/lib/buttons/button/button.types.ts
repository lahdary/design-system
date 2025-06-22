/**
 * Button types
 *
 * This file contains all type definitions related to buttons that can be used
 * across components, directives, and other parts of the application.
 */

/**
 * Button variants
 * @property primary - Primary action button
 * @property secondary - Secondary action button
 * @property tertiary - Tertiary action button (low emphasis)
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Button sizes
 * @property sm - Small button
 * @property md - Medium button (default)
 * @property lg - Large button
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button type attributes
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Base button properties interface
 * Common properties shared between button component and directive
 */
export interface ButtonProps {
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the button should take full width of container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * ARIA label for the button
   */
  ariaLabel?: string;

  /**
   * Button type attribute
   * @default 'button'
   */
  type?: ButtonType;
}
