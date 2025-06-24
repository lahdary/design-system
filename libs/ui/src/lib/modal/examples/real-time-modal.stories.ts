import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ModalService } from '../modal.service';
import { MODAL_DEFAULT_OPTIONS } from '../modal.types';
import { RealTimeModalComponent } from './real-time-modal.component';

@Component({
  selector: 'ds-real-time-modal-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-demo">
      <h2>Real-Time Modal Updates</h2>
      <p>
        Demonstrating real-time data sharing between a modal and its parent
        component, including the ability to control the modal from outside.
      </p>

      <div class="button-row">
        <button (click)="openRealTimeModal()">Open Real-Time Modal</button>
      </div>

      <div *ngIf="realTimeData()" class="real-time-monitor">
        <h3>Real-Time Data Monitor</h3>
        <div>
          <div class="data-row">
            <strong>Current Value:</strong>
            <span>{{ realTimeData().currentValue }}</span>
          </div>
          <div class="data-row">
            <strong>Status:</strong>
            <span>{{ realTimeData().status }}</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress"
              [style.width]="realTimeData().currentValue * 5 + '%'"
            ></div>
          </div>
        </div>

        <div class="control-panel" *ngIf="activeRealTimeModal()">
          <h4>External Controls</h4>
          <button class="action-button" (click)="resetRealTimeModal()">
            Reset Counter
          </button>
          <button class="action-button" (click)="incrementFromOutside()">
            Add +1
          </button>
        </div>
      </div>

      <div class="info-box" *ngIf="activeRealTimeModal()">
        <h4>Modal is currently open</h4>
        <p>
          Note how changes made within the modal are instantly reflected here,
          and how you can control the modal from outside.
        </p>
      </div>

      <div
        class="info-box"
        *ngIf="!activeRealTimeModal() && lastCounterValue() > 0"
      >
        <h4>Modal is currently closed</h4>
        <p>
          The last value ({{ lastCounterValue() }}) is stored and will be used
          when you reopen the modal. Try reopening to see persistence in action!
        </p>
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

      .real-time-monitor {
        margin-top: 2rem;
        padding: 1.5rem;
        background-color: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 0.5rem;
      }

      .real-time-monitor h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #0369a1;
      }

      .data-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        font-size: 1.1rem;
      }

      .progress-bar {
        height: 12px;
        background-color: #e5e7eb;
        border-radius: 6px;
        overflow: hidden;
        margin: 1rem 0;
      }

      .progress {
        height: 100%;
        background-color: #0ea5e9;
        transition: width 0.2s ease-in-out;
      }

      .control-panel {
        margin-top: 1.5rem;
        padding: 1rem;
        background-color: #f1f5f9;
        border-radius: 0.375rem;
      }

      .control-panel h4 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: #334155;
      }

      .action-button {
        margin-right: 0.75rem;
        background-color: #0ea5e9;
        color: white;
        border: none;
      }

      .action-button:hover {
        background-color: #0284c7;
      }

      .info-box {
        margin-top: 1.5rem;
        padding: 1rem;
        background-color: #f1f5f9;
        border: 1px solid #cbd5e1;
        border-radius: 0.375rem;
      }

      .info-box h4 {
        margin-top: 0;
        color: #334155;
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
    `,
  ],
})
class RealTimeModalDemoComponent {
  private modalService = inject(ModalService);
  lastResult = signal<any>(null);
  realTimeData = signal<{ currentValue: number; status: string } | null>(null);
  activeRealTimeModal = signal<any>(null);
  // Store the last counter value between modal sessions
  lastCounterValue = signal<number>(5);

  private monitorInterval: any = null;

  openRealTimeModal(): void {
    const modalRef = this.modalService.open(RealTimeModalComponent, {
      title: 'Real-Time Updates Example',
      size: 'md',
      data: {
        title: 'Progress Counter',
        // Use the saved counter value for persistence
        initialValue: this.lastCounterValue(),
      },
    });

    // Store reference to active modal
    this.activeRealTimeModal.set(modalRef);

    // Set up monitoring to detect changes in real-time
    this.monitorInterval = setInterval(() => {
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
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;

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
    }
  }

  incrementFromOutside(): void {
    const modalRef = this.activeRealTimeModal();
    // Need to use any type for accessing dynamic methods
    const instance = modalRef?.componentInstance as any;
    if (instance && typeof instance.increment === 'function') {
      // Call the component's increment method directly from outside the modal!
      instance.increment();
    }
  }
}

export default {
  title: 'Components/Modal/Real-Time Updates',
  component: RealTimeModalDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RealTimeModalComponent],
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
# Real-Time Modal Updates

This story demonstrates advanced bi-directional communication between a modal and its parent component. It shows how to build interactive modals that maintain state and can be controlled from outside.

## Features Shown

- Real-time data sharing between modal and parent component
- Controlling the modal component from outside (calling methods directly)
- Persisting state between modal sessions
- Handling modal lifecycle and cleanup

## Key Concepts

### Two-Way Communication

The modal component and parent component can communicate in real-time:

1. **Parent to Modal**: The parent can call methods on the modal component
2. **Modal to Parent**: The modal exposes its state to the parent component
3. **Real-time Updates**: Changes are reflected instantly in both directions

### State Persistence

Modal state is preserved between sessions, allowing users to:

1. Close a modal and reopen it with the same state
2. Continue where they left off without losing progress
3. Share state across multiple components or workflows

## Usage Example

### Parent Component (Opening and Monitoring the Modal)

\`\`\`typescript
// Open modal with initial value
const modalRef = this.modalService.open(RealTimeModalComponent, {
  data: { initialValue: this.lastStoredValue() }
});

// Store reference for later use
this.activeModal.set(modalRef);

// Set up monitoring
const monitor = setInterval(() => {
  const instance = modalRef.componentInstance;
  if (instance) {
    // Get real-time updates from the modal
    this.externalState.set({
      currentValue: instance.currentValue,
      status: instance.status
    });
  }
}, 100);

// Clean up when modal closes
modalRef.afterClosed((result) => {
  clearInterval(monitor);
  this.activeModal.set(null);
  
  // Store final value for persistence
  if (result && result.finalValue) {
    this.lastStoredValue.set(result.finalValue);
  }
});
\`\`\`

### Controlling the Modal from Outside

\`\`\`typescript
resetModalFromOutside(): void {
  const modalRef = this.activeModal();
  const instance = modalRef?.componentInstance;
  
  // Call methods on the modal component directly
  if (instance && typeof instance.reset === 'function') {
    instance.reset();
  }
}
\`\`\`

## Best Practices

1. Always clean up intervals and subscriptions
2. Use strong typing where possible to improve developer experience
3. Implement proper error handling for method calls
4. Consider performance implications of frequent updates
5. Use signals or observable patterns for reactive data updates
`,
      },
    },
  },
} as Meta;

type Story = StoryObj<RealTimeModalDemoComponent>;

export const Default: Story = {};
