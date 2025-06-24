import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MODAL_DATA, MODAL_REF } from '../modal.types';

interface UserFormData {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'ds-data-form-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="data-form-modal">
      <h3>{{ title }}</h3>

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          [value]="formData().name"
          (input)="updateFormField('name', $event)"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          [value]="formData().email"
          (input)="updateFormField('email', $event)"
        />
      </div>

      <div class="form-group">
        <label for="role">Role:</label>
        <select
          id="role"
          [value]="formData().role"
          (change)="updateFormField('role', $event)"
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <div class="modal-actions">
        <button class="secondary" (click)="cancel()">Cancel</button>
        <button class="primary" (click)="save()">Save Changes</button>
      </div>
    </div>
  `,
  styles: [
    `
      .data-form-modal {
        padding: 1rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 1.5rem;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      input,
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 1rem;
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.5rem;
      }

      button {
        padding: 0.5rem 1rem;
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
export class DataFormModalComponent {
  title = 'Edit User Profile';

  // Use signal for reactive form data
  formData = signal<UserFormData>({
    name: '',
    email: '',
    role: 'viewer',
  });

  // Access modal data and ref
  private modalRef = inject(MODAL_REF);
  private data = inject(MODAL_DATA);

  constructor() {
    // Initialize form with data if provided
    if (this.data && this.data.userData) {
      this.formData.set({
        name: this.data.userData.name || '',
        email: this.data.userData.email || '',
        role: this.data.userData.role || 'viewer',
      });
    }

    if (this.data && this.data.title) {
      this.title = this.data.title;
    }
  }

  updateFormField(field: keyof UserFormData, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    this.formData.update((currentData) => ({
      ...currentData,
      [field]: target.value,
    }));

    // Make form data available to parent through modalRef
    this.modalRef.componentInstance = {
      ...this.modalRef.componentInstance,
      currentFormData: this.formData(),
    };
  }

  save(): void {
    this.modalRef.close({
      saved: true,
      userData: this.formData(),
    });
  }

  cancel(): void {
    this.modalRef.close({
      saved: false,
    });
  }
}
