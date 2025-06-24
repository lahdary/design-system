import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ModalService } from '../modal.service';
import { MODAL_DEFAULT_OPTIONS } from '../modal.types';
import { DataFormModalComponent } from './data-form-modal.component';
import { ExampleModalComponent } from './example-modal.component';
import { RealTimeModalComponent } from './real-time-modal.component';

@Component({
  selector: 'ds-modal-service-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-service-demo">
      <h2>Modal Service Demo</h2>

      <div class="button-row">
        <button (click)="openBasicModal()">Open Basic Modal</button>
        <button (click)="openCustomModal()">Open Custom Modal</button>
        <button (click)="openFullScreenModal()">Open Fullscreen Modal</button>
        <button (click)="openBlurredModal()">Open With Blurred Backdrop</button>
      </div>

      <div class="section">
        <h3>Data Manipulation Examples</h3>
        <div class="button-row">
          <button (click)="openDataFormModal()">Open Data Form Modal</button>
          <button (click)="openRealTimeModal()">Open Real-Time Modal</button>
        </div>

        <div *ngIf="realTimeData()" class="real-time-monitor">
          <h4>Real-Time Modal Data:</h4>
          <div>
            Current Value: <strong>{{ realTimeData().currentValue }}</strong>
          </div>
          <div>
            Status: <strong>{{ realTimeData().status }}</strong>
          </div>
          <button (click)="resetRealTimeModal()" *ngIf="activeRealTimeModal()">
            Reset Counter
          </button>
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
      .modal-service-demo {
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

      .results {
        margin-top: 2rem;
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
        border-top: 1px solid #ddd;
        padding-top: 1rem;
      }

      .real-time-monitor {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 0.25rem;
      }

      .real-time-monitor h4 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: #0369a1;
      }

      .real-time-monitor div {
        margin-bottom: 0.5rem;
      }

      .real-time-monitor button {
        margin-top: 0.5rem;
        background-color: #0ea5e9;
        color: white;
        border: none;
      }

      .real-time-monitor button:hover {
        background-color: #0284c7;
      }
    `,
  ],
})
class ModalServiceDemoComponent {
  private modalService = inject(ModalService);
  lastResult = signal<any>(null);
  realTimeData = signal<{ currentValue: number; status: string } | null>(null);
  activeRealTimeModal = signal<any>(null);
  // Add a signal to store the last counter value between modal sessions
  lastCounterValue = signal<number>(5);

  openBasicModal(): void {
    const modalRef = this.modalService.open(ExampleModalComponent, {
      title: 'Basic Example',
      data: {
        title: 'Basic Modal',
        message: 'This is a basic modal example using our modal service.',
      },
    });

    modalRef.afterClosed((result) => {
      this.lastResult.set({
        modalType: 'Basic',
        result: result,
      });
    });
  }

  openCustomModal(): void {
    const modalRef = this.modalService.open(ExampleModalComponent, {
      title: 'Custom Size',
      size: 'lg',
      data: {
        title: 'Large Modal',
        message: 'This modal uses a custom size configuration (large).',
      },
    });

    modalRef.afterClosed((result) => {
      this.lastResult.set({
        modalType: 'Custom Size',
        result: result,
      });
    });
  }

  openFullScreenModal(): void {
    const modalRef = this.modalService.open(ExampleModalComponent, {
      title: 'Fullscreen Modal',
      size: 'full',
      data: {
        title: 'Fullscreen Modal',
        message: 'This modal takes up the entire screen.',
      },
    });

    modalRef.afterClosed((result) => {
      this.lastResult.set({
        modalType: 'Fullscreen',
        result: result,
      });
    });
  }

  openBlurredModal(): void {
    const modalRef = this.modalService.open(ExampleModalComponent, {
      title: 'Blurred Backdrop',
      backdropType: 'blur',
      data: {
        title: 'Blurred Backdrop',
        message: 'This modal has a blurred backdrop effect.',
      },
    });

    modalRef.afterClosed((result) => {
      this.lastResult.set({
        modalType: 'Blurred',
        result: result,
      });
    });
  }

  openDataFormModal(): void {
    // Initial user data
    const initialUserData = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'editor',
    };

    const modalRef = this.modalService.open(DataFormModalComponent, {
      title: 'Edit User Data',
      size: 'md',
      data: {
        title: 'Edit User Profile',
        userData: initialUserData,
      },
    });

    // Set up monitoring to detect changes in the component
    const monitorFormChanges = setInterval(() => {
      // Need to use any type for accessing dynamic properties
      const instance = modalRef.componentInstance as any;
      if (instance && instance.currentFormData) {
        // You could use this data to update UI outside the modal in real-time
        console.log('Form data changed:', instance.currentFormData);
      }
    }, 500);

    modalRef.afterClosed((result) => {
      // Clear the interval when modal is closed
      clearInterval(monitorFormChanges);

      this.lastResult.set({
        modalType: 'Data Form',
        result: result,
      });
    });
  }

  openRealTimeModal(): void {
    const modalRef = this.modalService.open(RealTimeModalComponent, {
      title: 'Real-Time Updates Example',
      size: 'md',
      data: {
        title: 'Progress Counter',
        // Use the saved counter value instead of hardcoding 5
        initialValue: this.lastCounterValue(),
      },
    });

    // Store reference to active modal
    this.activeRealTimeModal.set(modalRef);

    // Set up monitoring to detect changes in real-time
    const monitorChanges = setInterval(() => {
      // Need to use any type for accessing dynamic properties
      const instance = modalRef.componentInstance as any;
      if (instance) {
        this.realTimeData.set({
          currentValue: instance.currentValue || 0,
          status: instance.status || 'Not started',
        });
      }
    }, 100);

    modalRef.afterClosed((result) => {
      // Clear the interval when modal is closed
      clearInterval(monitorChanges);

      // Clear active modal reference
      this.activeRealTimeModal.set(null);

      // Save the last counter value when the modal closes
      if (result && typeof result.finalValue === 'number') {
        this.lastCounterValue.set(result.finalValue);
      } else if (this.realTimeData()) {
        // If there's no result but we have real-time data, use that
        this.lastCounterValue.set(this.realTimeData()!.currentValue);
      }

      this.lastResult.set({
        modalType: 'Real-Time Progress',
        result: result,
      });

      // Keep the last real-time data visible after closing
    });
  }

  resetRealTimeModal(): void {
    const modalRef = this.activeRealTimeModal();
    // Need to use any type for accessing dynamic methods
    const instance = modalRef?.componentInstance as any;
    if (instance && typeof instance.reset === 'function') {
      // Call the component's reset method directly from outside the modal!
      instance.reset();
      // Also reset our stored value
      this.lastCounterValue.set(0);
    }
  }
}

export default {
  title: 'Components/Modal/Modal Service',
  component: ModalServiceDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ExampleModalComponent,
        DataFormModalComponent,
        RealTimeModalComponent,
      ],
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
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Modal Service

A service for dynamically creating and managing modals with components.

## Features

- Open modals dynamically with custom components
- Configurable modal properties (size, backdrop, etc.)
- Pass data to modal components
- Receive results from closed modals
- Manage multiple modals
- Support for default configurations
- Access and manipulate modal component data from outside
- Real-time data exchange between modal and parent components

## Usage

\`\`\`typescript
import { Component, inject } from '@angular/core';
import { ModalService } from '@your-org/ui';
import { YourModalComponent } from './your-modal.component';

@Component({
  selector: 'app-demo',
  template: \`<button (click)="openModal()">Open Modal</button>\`,
})
export class DemoComponent {
  private modalService = inject(ModalService);
  
  openModal() {
    const modalRef = this.modalService.open(YourModalComponent, {
      title: 'Example Modal',
      size: 'lg',
      data: { message: 'Hello from modal!' }
    });
    
    modalRef.afterClosed((result) => {
      console.log('Modal closed with result:', result);
    });
  }
}
\`\`\`

Inside your modal component:

\`\`\`typescript
import { Component, inject } from '@angular/core';
import { MODAL_DATA, MODAL_REF } from '@your-org/ui';

@Component({
  selector: 'app-your-modal',
  template: \`<div>{{data.message}}</div>\`,
})
export class YourModalComponent {
  // Access provided data
  data = inject(MODAL_DATA);
  
  // Access modal reference
  modalRef = inject(MODAL_REF);
  
  closeModal(result: any) {
    this.modalRef.close(result);
  }
}
\`\`\`

## Advanced Usage with Data Manipulation

You can access and manipulate the modal component instance from the parent component:

\`\`\`typescript
// Open a modal with a form component
const modalRef = this.modalService.open(YourFormModalComponent, {
  data: { initialData: { name: 'John', age: 30 } }
});

// Access component data from outside the modal
const checkFormStatus = setInterval(() => {
  if (modalRef.componentInstance) {
    // Access properties on the component instance
    const currentFormData = modalRef.componentInstance.formData;
    console.log('Current form data:', currentFormData);
    
    // Call methods on the component instance
    modalRef.componentInstance.validateForm();
  }
}, 500);

// Clean up when modal is closed
modalRef.afterClosed((result) => {
  clearInterval(checkFormStatus);
  console.log('Form submitted with:', result);
});
\`\`\`
`,
      },
    },
  },
} as Meta;

type Story = StoryObj<ModalServiceDemoComponent>;

export const Default: Story = {};
