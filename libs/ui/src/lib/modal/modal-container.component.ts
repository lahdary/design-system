import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { MODAL_REF, ModalRef } from './modal.types';

/**
 * Component used to dynamically load and host content components within a modal
 */
@Component({
  selector: 'ds-modal-container',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  template: `
    <ds-ui-modal
      [open]="true"
      [title]="title"
      [closeOnOutsideClick]="closeOnOutsideClick"
      [closeOnEsc]="closeOnEsc"
      [size]="size"
      [backdropType]="backdropType"
      [showCloseButton]="showCloseButton"
      [contentPadding]="contentPadding"
      (closed)="handleClose()"
    >
      <div #contentContainer></div>
      <div slot="footer" *ngIf="showFooter">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </ds-ui-modal>
  `,
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild('contentContainer', { read: ViewContainerRef, static: true })
  contentContainer!: ViewContainerRef;

  // Inputs received from the service when creating the modal
  @Input() title = '';
  @Input() closeOnOutsideClick = true;
  @Input() closeOnEsc = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() backdropType: 'dimmed' | 'blur' | 'none' = 'dimmed';
  @Input() showCloseButton = true;
  @Input() contentPadding = true;
  @Input() showFooter = false;

  // Component type to be loaded
  @Input() componentType?: Type<any>;

  // Modal data to be injected into component
  @Input() data: any = null;

  // Reference to the dynamically created component
  private componentRef?: ComponentRef<any>;

  // Reference to the modal
  modalRef = inject<ModalRef<any>>(MODAL_REF);

  /**
   * Create and inject the content component
   */
  ngOnInit(): void {
    if (!this.componentType) {
      console.warn('No component type provided to modal container');
      return;
    }

    // Clear existing content
    this.contentContainer.clear();

    // Create the component
    this.componentRef = this.contentContainer.createComponent(
      this.componentType,
      {
        injector: this.contentContainer.injector,
      }
    );

    // Store the component instance in the modal reference
    if (this.modalRef) {
      this.modalRef.componentInstance = this.componentRef.instance;
    }

    // Pass data to the component if available
    if (this.data && this.componentRef.instance) {
      Object.assign(this.componentRef.instance, { data: this.data });
    }

    // Trigger change detection
    this.componentRef.changeDetectorRef.detectChanges();
  }

  /**
   * Clean up when the container is destroyed
   */
  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  /**
   * Handle close events from the modal component
   */
  handleClose(): void {
    // When the modal requests to be closed, call close on the modalRef
    // The service is listening for this to clean up the DOM
    this.modalRef.close();
  }
}
