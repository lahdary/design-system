import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MODAL_DATA, MODAL_REF } from '../modal.types';

@Component({
  selector: 'ds-example-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="example-modal-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>

      <div class="example-modal-buttons">
        <button (click)="confirm(true)">Confirm</button>
        <button (click)="confirm(false)">Cancel</button>
      </div>
    </div>
  `,
  styles: [
    `
      .example-modal-content {
        padding: 1rem;
        text-align: center;
      }

      .example-modal-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        background-color: #f8f8f8;
        cursor: pointer;
      }

      button:hover {
        background-color: #e8e8e8;
      }
    `,
  ],
})
export class ExampleModalComponent {
  title = 'Confirmation';
  message = 'Are you sure you want to proceed?';

  // Access modal data and ref
  private modalRef = inject(MODAL_REF);
  private data = inject(MODAL_DATA);

  constructor() {
    // Update properties from modal data if provided
    if (this.data) {
      if (this.data.title) this.title = this.data.title;
      if (this.data.message) this.message = this.data.message;
    }
  }

  confirm(result: boolean): void {
    // Immediately close the modal and return the result
    setTimeout(() => {
      this.modalRef.close(result);
    }, 0);
  }
}
