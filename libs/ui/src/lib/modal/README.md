# Modal Service

A service for creating and managing modal dialogs in Angular applications.

## Overview

The Modal Service allows you to dynamically open and manage modals containing custom components. It builds on top of the ModalComponent, providing an imperative API similar to Angular Material's Dialog service.

## Features

- Open modals with dynamic component content
- Configure modal appearance and behavior
- Pass data to modal components
- Retrieve results when modals close
- Multiple open modals with proper stacking
- Manage modal lifecycle (opening, open, closing, closed)
- Default configuration options

## Installation

The modal service is part of the UI library and should be available once the library is installed.

## Usage

### Basic Usage

```typescript
import { Component, inject } from '@angular/core';
import { ModalService } from '@design-system/ui';
import { UserProfileComponent } from './user-profile.component';

@Component({
  selector: 'app-example',
  template: `<button (click)="openModal()">Open User Profile</button>`,
})
export class ExampleComponent {
  private modalService = inject(ModalService);

  openModal() {
    const modalRef = this.modalService.open(UserProfileComponent, {
      title: 'User Profile',
      data: { userId: 123 },
    });

    modalRef.afterClosed((result) => {
      console.log('Modal closed with result:', result);
    });
  }
}
```

### Creating Modal Content Components

Your modal content components should inject the MODAL_DATA and MODAL_REF tokens:

```typescript
import { Component, inject } from '@angular/core';
import { MODAL_DATA, MODAL_REF } from '@design-system/ui';

@Component({
  selector: 'app-user-profile',
  template: `
    <div>
      <h2>User Profile</h2>
      <p>User ID: {{ data.userId }}</p>
      <button (click)="close()">Close</button>
    </div>
  `,
})
export class UserProfileComponent {
  // Get the injected data
  data = inject(MODAL_DATA);

  // Get reference to the modal
  modalRef = inject(MODAL_REF);

  close() {
    // Close the modal and optionally return a result
    this.modalRef.close({ updated: true });
  }
}
```

### Configuration Options

The modal service supports the following configuration options:

```typescript
interface ModalConfig<D = any> {
  title?: string; // Modal title
  data?: D; // Data to pass to the component
  closeOnOutsideClick?: boolean; // Close when clicking outside
  closeOnEsc?: boolean; // Close when Escape key is pressed
  size?: 'sm' | 'md' | 'lg' | 'full'; // Modal size
  backdropType?: 'dimmed' | 'blur' | 'none'; // Type of backdrop
  showCloseButton?: boolean; // Show close button in header
  contentPadding?: boolean; // Apply padding to content
  panelClass?: string | string[]; // Custom CSS classes
  width?: string; // Custom width
  height?: string; // Custom height
  restoreFocus?: boolean; // Restore focus after closing
}
```

### Default Configuration

You can provide default configuration for all modals:

```typescript
import { MODAL_DEFAULT_OPTIONS } from '@design-system/ui';

@NgModule({
  providers: [
    {
      provide: MODAL_DEFAULT_OPTIONS,
      useValue: {
        closeOnOutsideClick: true,
        closeOnEsc: true,
        size: 'md',
        backdropType: 'dimmed',
        showCloseButton: true,
        contentPadding: true,
      },
    },
  ],
})
export class AppModule {}
```

### Managing Multiple Modals

The modal service can manage multiple open modals:

```typescript
// Open multiple modals
const firstModal = modalService.open(FirstComponent);
const secondModal = modalService.open(SecondComponent);

// Get all open modals
const openModals = modalService.getOpenModals();

// Find a specific modal
const modal = modalService.getModalById('modal-123');

// Close all open modals
modalService.closeAll();
```

## Accessibility

The modal service ensures proper accessibility features:

- Proper ARIA attributes (aria-modal, aria-labelledby)
- Focus trap within the modal
- Focus restoration after closing
- Keyboard navigation support

## Advanced Usage

The modal service supports advanced usage patterns for complex scenarios:

### Storybook Examples

We provide several Storybook examples that demonstrate different aspects of the modal service:

1. **Basic Modal Usage** - Shows how to configure and open modals with different properties.

   - See the story at `Components/Modal/Basic Usage`

2. **Data Form Modal** - Demonstrates how to use modals for data manipulation, form editing, and passing data between components.

   - See the story at `Components/Modal/Data Form`

3. **Real-Time Updates** - Shows bi-directional communication between a modal and its parent, including real-time data sharing and external control.
   - See the story at `Components/Modal/Real-Time Updates`

Each story includes comprehensive documentation on its usage patterns and best practices.

See the [Future Enhancements](./docs/future-enhancements.md) document for upcoming features and advanced usage patterns.

## API Reference

### ModalService

| Method                                                                                   | Description                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------ |
| `open<T, D = any, R = any>(component: Type<T>, config?: ModalConfig<D>): ModalRef<T, R>` | Opens a modal with the specified component |
| `closeAll(): void`                                                                       | Closes all open modals                     |
| `getOpenModals(): ModalRef<any>[]`                                                       | Gets all currently open modals             |
| `getModalById(id: string): ModalRef \| undefined`                                        | Finds a modal by its ID                    |

### ModalRef

| Property/Method                                                 | Description                                |
| --------------------------------------------------------------- | ------------------------------------------ |
| `componentInstance: T \| null`                                  | Instance of the component inside the modal |
| `state: Signal<ModalState>`                                     | Current state of the modal                 |
| `close(result?: R): void`                                       | Closes the modal with an optional result   |
| `afterClosed(callback: (result: R \| undefined) => void): void` | Sets a callback for when the modal closes  |
| `getId(): string`                                               | Gets the unique ID of the modal            |

### Injection Tokens

| Token                   | Description                                   |
| ----------------------- | --------------------------------------------- |
| `MODAL_DATA`            | Token to inject data into the modal component |
| `MODAL_REF`             | Token to inject the modal reference           |
| `MODAL_DEFAULT_OPTIONS` | Token for default modal configuration         |
