import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ModalService } from '../modal.service';
import { MODAL_DEFAULT_OPTIONS } from '../modal.types';
import { DataFormModalComponent } from './data-form-modal.component';

@Component({
  selector: 'ds-data-form-modal-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-demo">
      <h2>Data Form Modal</h2>
      <p>
        Demonstrating data manipulation with modals, including form editing and
        data passing.
      </p>

      <div class="button-row">
        <button (click)="openDataFormModal()">Open Data Form Modal</button>
      </div>

      <div class="section" *ngIf="formStatus()">
        <h3>Form Status (External Monitoring):</h3>
        <div class="status-box">
          <dl>
            <dt>Monitoring:</dt>
            <dd>{{ formStatus().isMonitoring ? 'Active' : 'Inactive' }}</dd>

            <dt>Current Name:</dt>
            <dd>{{ formStatus().currentData?.name || 'N/A' }}</dd>

            <dt>Current Email:</dt>
            <dd>{{ formStatus().currentData?.email || 'N/A' }}</dd>

            <dt>Current Role:</dt>
            <dd>{{ formStatus().currentData?.role || 'N/A' }}</dd>
          </dl>
        </div>
      </div>

      <div class="results" *ngIf="lastResult() !== null">
        <h3>Last Modal Result:</h3>
        <pre>{{ lastResult() | json }}</pre>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-demo {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 2rem 0;
      }

      button {
        padding: 0.75rem 1.5rem;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
        background-color: #f8f8f8;
        cursor: pointer;
        font-weight: 500;
      }

      button:hover {
        background-color: #e8e8e8;
      }

      .results,
      .status-box {
        margin-top: 1.5rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
        background-color: #f8f8f8;
      }

      pre {
        background-color: #e8e8e8;
        padding: 0.5rem;
        border-radius: 0.25rem;
        overflow-x: auto;
      }

      .section {
        margin-top: 2rem;
      }

      dl {
        display: grid;
        grid-template-columns: 120px 1fr;
        row-gap: 0.5rem;
      }

      dt {
        font-weight: 600;
      }

      dd {
        margin: 0;
      }
    `,
  ],
})
class DataFormModalDemoComponent {
  private modalService = inject(ModalService);
  lastResult = signal<any>(null);
  formStatus = signal<{
    isMonitoring: boolean;
    currentData: any;
  } | null>(null);

  private monitorInterval: any = null;

  openDataFormModal(): void {
    // Initial user data
    const initialUserData = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'editor',
    };

    // Reset form status
    this.formStatus.set({
      isMonitoring: true,
      currentData: { ...initialUserData },
    });

    const modalRef = this.modalService.open(DataFormModalComponent, {
      title: 'Edit User Data',
      size: 'md',
      data: {
        title: 'Edit User Profile',
        userData: initialUserData,
      },
    });

    // Set up monitoring to detect changes in the component
    this.monitorInterval = setInterval(() => {
      // Need to use any type for accessing dynamic properties
      const instance = modalRef.componentInstance as any;
      if (instance && instance.currentFormData) {
        // Update external UI with form data in real-time
        this.formStatus.update((status) => ({
          ...status!,
          currentData: { ...instance.currentFormData },
        }));
      }
    }, 300);

    modalRef.afterClosed((result) => {
      // Clear the interval when modal is closed
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;

      // Update monitoring status
      this.formStatus.update((status) => ({
        ...status!,
        isMonitoring: false,
      }));

      this.lastResult.set({
        modalType: 'Data Form',
        result: result,
      });
    });
  }
}

export default {
  title: 'Components/Modal/Data Form',
  component: DataFormModalDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DataFormModalComponent],
      providers: [
        {
          provide: MODAL_DEFAULT_OPTIONS,
          useValue: {
            closeOnOutsideClick: true,
            closeOnEsc: true,
            showCloseButton: true,
          },
        },
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Modal Data Form Example

This story demonstrates how to use the modal service for data manipulation use cases. It shows how to pass data to a modal, monitor form changes in real-time from outside the modal, and handle form submission results.

## Features Shown

- Passing initial data to a modal
- Accessing modal component instance from outside
- Monitoring form data changes in real-time
- Processing form submission results

## Usage

### Opening a Form Modal with Initial Data

\`\`\`typescript
// Define initial data
const initialData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'editor',
};

// Open modal with the data
const modalRef = this.modalService.open(DataFormModalComponent, {
  title: 'Edit User Data',
  data: {
    title: 'Edit User Profile',
    userData: initialData,
  },
});
\`\`\`

### Accessing Component Properties from Outside the Modal

\`\`\`typescript
// Monitor changes in the component instance
const interval = setInterval(() => {
  // Access component instance properties
  const instance = modalRef.componentInstance as YourComponentType;
  if (instance && instance.currentFormData) {
    console.log('Current form data:', instance.currentFormData);
    // Update UI or perform other actions based on current data
  }
}, 300);

// Important: Clean up when done
modalRef.afterClosed(() => {
  clearInterval(interval);
});
\`\`\`

### Inside the Modal Component

\`\`\`typescript
// Make data accessible to parent component
this.modalRef.componentInstance = {
  ...this.modalRef.componentInstance,
  currentFormData: this.formData(),
};

// Return data when closing
this.modalRef.close({
  saved: true,
  userData: this.formData(),
});
\`\`\`

## Best Practices

1. Always clean up monitoring intervals when the modal closes
2. Provide clear typing for modal component instance properties
3. Consider using signals for reactive data updates
4. Keep the data communication pattern consistent across components
`,
      },
    },
  },
} as Meta;

type Story = StoryObj<DataFormModalDemoComponent>;

export const Default: Story = {};
