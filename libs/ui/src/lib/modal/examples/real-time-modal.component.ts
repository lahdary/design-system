import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MODAL_DATA, MODAL_REF } from '../modal.types';

@Component({
  selector: 'ds-real-time-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="real-time-modal">
      <h3>{{ title }}</h3>

      <div class="content">
        <p>
          This modal demonstrates real-time data updates that are visible to the
          parent component.
        </p>

        <div class="counter-display">
          <div class="counter">{{ counter() }}</div>
          <div class="progress-bar">
            <div class="progress" [style.width]="counter() * 5 + '%'"></div>
          </div>
        </div>

        <div class="actions">
          <button (click)="decrement()">-</button>
          <button (click)="increment()">+</button>
        </div>

        <div class="status">
          <p>
            Status: <strong>{{ getStatus() }}</strong>
          </p>
        </div>
      </div>

      <div class="modal-actions">
        <button class="secondary" (click)="reset()">Reset</button>
        <button class="primary" (click)="complete()">Complete</button>
      </div>
    </div>
  `,
  styles: [
    `
      .real-time-modal {
        padding: 1.5rem;
        text-align: center;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      .content {
        margin: 2rem 0;
      }

      .counter-display {
        margin: 2rem auto;
        width: 80%;
      }

      .counter {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .progress-bar {
        height: 10px;
        background-color: #e5e7eb;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 1rem;
      }

      .progress {
        height: 100%;
        background-color: #2563eb;
        transition: width 0.2s ease-in-out;
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin: 1.5rem 0;
      }

      .actions button {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f3f4f6;
        border: 1px solid #d1d5db;
        cursor: pointer;
      }

      .actions button:hover {
        background-color: #e5e7eb;
      }

      .status {
        margin: 1rem 0;
        font-size: 1.125rem;
      }

      .modal-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
      }

      button {
        padding: 0.5rem 1.5rem;
        border-radius: 0.25rem;
        font-weight: 500;
        cursor: pointer;
      }

      button.primary {
        background-color: #2563eb;
        color: white;
        border: 1px solid #2563eb;
      }

      button.primary:hover {
        background-color: #1d4ed8;
      }

      button.secondary {
        background-color: white;
        color: #333;
        border: 1px solid #ccc;
      }

      button.secondary:hover {
        background-color: #f3f4f6;
      }
    `,
  ],
})
export class RealTimeModalComponent {
  title = 'Real-Time Progress';
  counter = signal<number>(0);

  private modalRef = inject(MODAL_REF);
  private data = inject(MODAL_DATA);

  constructor() {
    if (this.data && this.data.title) {
      this.title = this.data.title;
    }

    if (this.data && typeof this.data.initialValue === 'number') {
      this.counter.set(this.data.initialValue);
    }

    // Update the component instance with our counter signal getter
    // to make it accessible from the parent component
    this.updateParentAccess();
  }

  increment(): void {
    if (this.counter() < 20) {
      this.counter.update((count) => count + 1);
      this.updateParentAccess();
    }
  }

  decrement(): void {
    if (this.counter() > 0) {
      this.counter.update((count) => count - 1);
      this.updateParentAccess();
    }
  }

  reset(): void {
    this.counter.set(0);
    this.updateParentAccess();
  }

  complete(): void {
    this.modalRef.close({
      finalValue: this.counter(),
      status: this.getStatus(),
    });
  }

  getStatus(): string {
    const count = this.counter();
    if (count < 5) return 'Just started';
    if (count < 10) return 'Making progress';
    if (count < 15) return 'Almost there';
    return 'Complete!';
  }

  private updateParentAccess(): void {
    // Make the real-time data accessible to parent through modalRef
    this.modalRef.componentInstance = {
      ...this.modalRef.componentInstance,
      currentValue: this.counter(),
      status: this.getStatus(),
      // Provide methods that can be called from parent
      reset: this.reset.bind(this),
    };
  }
}
