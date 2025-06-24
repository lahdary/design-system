import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ModalService } from '../modal.service';
import { MODAL_DEFAULT_OPTIONS } from '../modal.types';
import { ExampleModalComponent } from './example-modal.component';

@Component({
  selector: 'ds-basic-modal-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-demo">
      <h2>Basic Modal Usage</h2>
      <p>
        Demonstrating the basic features of the modal service with various
        configurations.
      </p>

      <div class="button-row">
        <button (click)="openBasicModal()">Open Basic Modal</button>
        <button (click)="openCustomModal()">Open Large Modal</button>
        <button (click)="openFullScreenModal()">Open Fullscreen Modal</button>
        <button (click)="openBlurredModal()">Open With Blurred Backdrop</button>
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
class BasicModalDemoComponent {
  private modalService = inject(ModalService);
  lastResult = signal<any>(null);

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
}

export default {
  title: 'Components/Modal/Basic Usage',
  component: BasicModalDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ExampleModalComponent],
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
# Basic Modal Usage

This story demonstrates how to use the modal service for basic use cases. The modal service allows you to open a modal with a component and configure various properties such as size and backdrop type.

## Features Shown

- Opening a basic modal with default settings
- Setting a custom size for the modal (small, medium, large, fullscreen)
- Configuring backdrop appearance
- Handling modal results

## Usage

\`\`\`typescript
import { Component, inject } from '@angular/core';
import { ModalService } from '@your-org/ui';
import { YourModalComponent } from './your-modal.component';

@Component({
  selector: 'app-demo',
  template: '<button (click)="openModal()">Open Modal</button>',
})
export class DemoComponent {
  private modalService = inject(ModalService);
  
  openModal() {
    const modalRef = this.modalService.open(YourModalComponent, {
      title: 'Example Modal',
      size: 'md',
      data: { message: 'Hello from modal!' }
    });
    
    modalRef.afterClosed((result) => {
      console.log('Modal closed with result:', result);
    });
  }
}
\`\`\`

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| title | string | '' | Title displayed in the modal header |
| size | 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | Size of the modal |
| backdropType | 'standard' \| 'blur' | 'standard' | Type of backdrop effect |
| closeOnOutsideClick | boolean | true | Whether clicking outside the modal closes it |
| closeOnEsc | boolean | true | Whether pressing ESC key closes the modal |
| showCloseButton | boolean | true | Whether to show the close button in header |
| data | any | null | Data to pass to the modal component |
`,
      },
    },
  },
} as Meta;

type Story = StoryObj<BasicModalDemoComponent>;

export const Default: Story = {};
