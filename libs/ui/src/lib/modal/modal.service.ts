import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { ModalContainerComponent } from './modal-container.component';
import {
  MODAL_DATA,
  MODAL_DEFAULT_OPTIONS,
  MODAL_REF,
  ModalConfig,
  ModalRef,
} from './modal.types';

/**
 * Service for creating and managing modal dialogs
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  /**
   * Array of currently open modals
   */
  private openModals = signal<ModalRef<any>[]>([]);

  /**
   * Track the next modal ID
   */
  private nextId = 0;

  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private environmentInjector = inject(EnvironmentInjector);
  private defaultConfig: ModalConfig =
    inject(MODAL_DEFAULT_OPTIONS, { optional: true }) || {};

  /**
   * Get all currently open modals
   */
  public getOpenModals(): ModalRef<any>[] {
    return this.openModals();
  }

  /**
   * Open a modal with the specified component
   * @param component Component type to be rendered inside the modal
   * @param config Modal configuration options
   * @returns Reference to the created modal
   */
  open<T, D = any, R = any>(
    component: Type<T>,
    config?: ModalConfig<D>
  ): ModalRef<T, R> {
    // Create a unique ID for this modal
    const modalId = `modal-${this.nextId++}`;

    // Create modal reference
    const modalRef = new ModalRef<T, R>(modalId);

    // Merge default config with provided config
    const mergedConfig: ModalConfig<D> = {
      ...this.defaultConfig,
      ...config,
    };

    // Create custom injector for the modal
    const modalInjector = Injector.create({
      providers: [
        { provide: MODAL_REF, useValue: modalRef },
        { provide: MODAL_DATA, useValue: mergedConfig.data || null },
      ],
      parent: this.injector,
    });

    // Create modal container component
    const containerRef = createComponent(ModalContainerComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: modalInjector,
    });

    // Set container component inputs
    containerRef.instance.componentType = component;
    containerRef.instance.title = mergedConfig.title || '';
    containerRef.instance.closeOnOutsideClick =
      mergedConfig.closeOnOutsideClick !== undefined
        ? mergedConfig.closeOnOutsideClick
        : true;
    containerRef.instance.closeOnEsc =
      mergedConfig.closeOnEsc !== undefined ? mergedConfig.closeOnEsc : true;
    containerRef.instance.size = mergedConfig.size || 'md';
    containerRef.instance.backdropType = mergedConfig.backdropType || 'dimmed';
    containerRef.instance.showCloseButton =
      mergedConfig.showCloseButton !== undefined
        ? mergedConfig.showCloseButton
        : true;
    containerRef.instance.contentPadding =
      mergedConfig.contentPadding !== undefined
        ? mergedConfig.contentPadding
        : true;
    containerRef.instance.data = mergedConfig.data || null;

    // Add to the DOM
    document.body.appendChild(containerRef.location.nativeElement);

    // Attach to the application
    this.appRef.attachView(containerRef.hostView);

    // Update state to 'opening'
    modalRef.state.set('opening');

    // Add to open modals list
    this.openModals.update((modals) => [...modals, modalRef]);

    // Update state to 'open' immediately for better responsiveness
    modalRef.state.set('open');

    // Override the close method in the modalRef to ensure it triggers our closeModal
    const originalClose = modalRef.close.bind(modalRef);
    modalRef.close = (result?: any) => {
      // First call the original close to set the state and result
      originalClose(result);
      // Then actually close the modal
      this.closeModal(modalRef, containerRef);
    };

    // Set up after-closed callback handling
    modalRef.afterClosed((result) => {
      // This is for external code that needs to know when the modal is closed
      // The actual closing is handled by the overridden close method above
    });

    return modalRef;
  }

  /**
   * Close all open modals
   */
  closeAll(): void {
    const modals = [...this.openModals()];
    modals.forEach((modal) => modal.close());
  }

  /**
   * Find a modal by its ID
   * @param id Modal ID
   * @returns Modal reference or undefined if not found
   */
  getModalById(id: string): ModalRef | undefined {
    return this.openModals().find((modal) => modal.getId() === id);
  }

  /**
   * Close a specific modal
   * @param modalRef Modal reference
   * @param containerRef Container component reference
   */
  private closeModal(
    modalRef: ModalRef,
    containerRef: ComponentRef<ModalContainerComponent>
  ): void {
    // Set state to closing
    modalRef.state.set('closing');

    // Remove from open modals list
    this.openModals.update((modals) =>
      modals.filter((m) => m.getId() !== modalRef.getId())
    );

    // Remove from the DOM after animation completes
    // Reduced animation time for better responsiveness
    setTimeout(() => {
      // Detach from the application
      this.appRef.detachView(containerRef.hostView);

      // Destroy the component
      containerRef.destroy();

      // Update state
      modalRef.state.set('closed');

      // Remove from the DOM
      if (containerRef.location.nativeElement.parentNode) {
        containerRef.location.nativeElement.parentNode.removeChild(
          containerRef.location.nativeElement
        );
      }
    }, 150); // Reduced from 300ms for quicker response
  }
}
