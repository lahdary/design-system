import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { StoryObj, moduleMetadata } from '@storybook/angular';
import {
  SortableHeaderDirective,
  TableBodyDirective,
  TableCellDirective,
  TableDirective,
  TableHeaderCellDirective,
  TableHeaderDirective,
  TableRowDirective,
} from '../directives';
import { SortEvent } from '../table.types';
// Using import type for the types used in decorated properties
import type { TableBorderStyle, TableDensity, TableSize } from '../table.types';

// Demo component for the table stories
@Component({
  selector: 'ds-table-demo',
  template: `
    <div class="ds-table-container">
      <table
        ds-table
        [size]="_size()"
        [density]="_density()"
        [border]="_border()"
        [striped]="_striped()"
        [hover]="_hover()"
      >
        <thead ds-table-header>
          <tr ds-table-row>
            <th
              ds-table-header-cell
              ds-sortable="id"
              [align]="'left'"
              (sort)="onSort($event)"
            >
              ID
            </th>
            <th
              ds-table-header-cell
              ds-sortable="name"
              [align]="'left'"
              (sort)="onSort($event)"
            >
              Name
            </th>
            <th
              ds-table-header-cell
              ds-sortable="email"
              [align]="'left'"
              (sort)="onSort($event)"
            >
              Email
            </th>
            <th
              ds-table-header-cell
              ds-sortable="role"
              [align]="'left'"
              (sort)="onSort($event)"
            >
              Role
            </th>
            <th
              ds-table-header-cell
              ds-sortable="status"
              [align]="'center'"
              (sort)="onSort($event)"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody ds-table-body>
          @for (user of sortedUsers(); track user.id) {
          <tr ds-table-row>
            <td ds-table-cell [align]="'left'">{{ user.id }}</td>
            <td ds-table-cell [align]="'left'">{{ user.name }}</td>
            <td ds-table-cell [align]="'left'">{{ user.email }}</td>
            <td ds-table-cell [align]="'left'">{{ user.role }}</td>
            <td ds-table-cell [align]="'center'">
              <span
                [class]="
                  user.status === 'active' ? 'status-active' : 'status-inactive'
                "
              >
                {{ user.status }}
              </span>
            </td>
          </tr>
          }
        </tbody>
      </table>

      <p><strong>Current sort:</strong> {{ currentSort() }}</p>
    </div>
  `,
  styles: [
    `
      .status-active {
        background-color: #e6f7e6;
        color: #1e7e1e;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        font-weight: 500;
      }

      .status-inactive {
        background-color: #fde8e8;
        color: #e02424;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        font-weight: 500;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    TableHeaderDirective,
    TableBodyDirective,
    TableRowDirective,
    TableHeaderCellDirective,
    TableCellDirective,
    SortableHeaderDirective,
  ],
})
class TableDemoComponent {
  // Internal signals
  _size = signal<TableSize>('md');
  _density = signal<TableDensity>('default');
  _border = signal<TableBorderStyle>('horizontal');
  _striped = signal(false);
  _hover = signal(true);

  // Input properties that update the signals
  @Input() set size(value: TableSize) {
    if (value) this._size.set(value);
  }

  @Input() set density(value: TableDensity) {
    if (value) this._density.set(value);
  }

  @Input() set border(value: TableBorderStyle) {
    if (value) this._border.set(value);
  }

  @Input() set striped(value: boolean) {
    this._striped.set(value);
  }

  @Input() set hover(value: boolean) {
    this._hover.set(value);
  }

  users = signal([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Admin',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'Editor',
      status: 'active',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'User',
      status: 'active',
    },
    {
      id: 5,
      name: 'Alex Brown',
      email: 'alex.brown@example.com',
      role: 'Editor',
      status: 'inactive',
    },
  ]);

  sortColumn = signal('id');
  sortDirection = signal('asc');
  currentSort = signal('id asc');

  sortedUsers = signal(this.users());

  onSort(event: SortEvent): void {
    this.sortColumn.set(event.columnId);
    this.sortDirection.set(event.direction);
    this.currentSort.set(`${event.columnId} ${event.direction}`);

    const sorted = [...this.users()];

    if (event.direction === 'none') {
      // Reset to original order
      this.sortedUsers.set(this.users());
      return;
    }

    sorted.sort((a, b) => {
      const aValue = a[event.columnId as keyof typeof a];
      const bValue = b[event.columnId as keyof typeof b];

      if (aValue < bValue) {
        return event.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return event.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.sortedUsers.set(sorted);
  }
}

// Create interfaces for the story arg types to play well with signals
interface TableDemoComponentProps {
  size: TableSize;
  density: TableDensity;
  border: TableBorderStyle;
  striped: boolean;
  hover: boolean;
}

// Wrapper component with input properties that will be mapped to signals
@Component({
  selector: 'ds-table-demo-wrapper',
  template: `
    <ds-table-demo
      [size]="size"
      [density]="density"
      [border]="border"
      [striped]="striped"
      [hover]="hover"
    >
    </ds-table-demo>
  `,
  standalone: true,
  imports: [CommonModule, TableDemoComponent],
})
class TableDemoComponentWrapper {
  @Input() size: TableSize = 'md';
  @Input() density: TableDensity = 'default';
  @Input() border: TableBorderStyle = 'horizontal';
  @Input() striped = false;
  @Input() hover = true;
}

export default {
  title: 'Data Display/Table',
  component: TableDemoComponentWrapper,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TableDemoComponent,
        TableDirective,
        TableHeaderDirective,
        TableBodyDirective,
        TableRowDirective,
        TableHeaderCellDirective,
        TableCellDirective,
        SortableHeaderDirective,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Table Component

A directive-based Table component that enhances native HTML tables with consistent styling, sortable columns,
and other features while maintaining proper semantics and accessibility.

## Features

- Works with native HTML table elements
- Sortable columns
- Various size and density options
- Multiple border styles
- Striped rows option
- Row hover effects
- Responsive design
- Proper ARIA attributes

## Usage

Basic usage:

\`\`\`html
<table ds-table>
  <thead ds-table-header>
    <tr ds-table-row>
      <th ds-table-header-cell>Header 1</th>
      <th ds-table-header-cell>Header 2</th>
    </tr>
  </thead>
  <tbody ds-table-body>
    <tr ds-table-row>
      <td ds-table-cell>Cell 1</td>
      <td ds-table-cell>Cell 2</td>
    </tr>
  </tbody>
</table>
\`\`\`

With sortable headers:

\`\`\`html
<table ds-table>
  <thead ds-table-header>
    <tr ds-table-row>
      <th ds-table-header-cell ds-sortable="name" (sort)="onSort($event)">Name</th>
      <th ds-table-header-cell ds-sortable="age" (sort)="onSort($event)">Age</th>
    </tr>
  </thead>
  <tbody ds-table-body>
    <!-- Table body content -->
  </tbody>
</table>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the table',
      table: {
        type: { summary: 'TableSize' },
        defaultValue: { summary: 'md' },
      },
    },
    density: {
      control: { type: 'select' },
      options: ['compact', 'default', 'spacious'],
      description: 'The density of the table rows',
      table: {
        type: { summary: 'TableDensity' },
        defaultValue: { summary: 'default' },
      },
    },
    border: {
      control: { type: 'select' },
      options: ['none', 'horizontal', 'vertical', 'all'],
      description: 'The border style of the table',
      table: {
        type: { summary: 'TableBorderStyle' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Whether to show striped rows',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hover: {
      control: { type: 'boolean' },
      description: 'Whether to show hover effects on rows',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    size: 'md',
    density: 'default',
    border: 'horizontal',
    striped: false,
    hover: true,
  },
};

type Story = StoryObj<TableDemoComponentWrapper>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm' as TableSize,
  },
};

export const Large: Story = {
  args: {
    size: 'lg' as TableSize,
  },
};

export const Compact: Story = {
  args: {
    density: 'compact' as TableDensity,
  },
};

export const Spacious: Story = {
  args: {
    density: 'spacious' as TableDensity,
  },
};

export const Striped: Story = {
  args: {
    striped: true,
  },
};

export const AllBorders: Story = {
  args: {
    border: 'all' as TableBorderStyle,
  },
};

export const NoBorders: Story = {
  args: {
    border: 'none' as TableBorderStyle,
  },
};

export const NoHover: Story = {
  args: {
    hover: false,
  },
};

// Custom example combining multiple features
export const FullFeatured: Story = {
  args: {
    size: 'md' as TableSize,
    density: 'compact' as TableDensity,
    border: 'all' as TableBorderStyle,
    striped: true,
    hover: true,
  },
};
