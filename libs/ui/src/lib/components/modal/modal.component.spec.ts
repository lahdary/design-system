import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../buttons/button';

@Component({
  template: `
    <ds-ui-modal
      [open]="isOpen"
      [title]="modalTitle"
      [size]="modalSize"
      [backdropType]="backdropType"
      [closeOnOutsideClick]="closeOnOutsideClick"
      [closeOnEsc]="closeOnEsc"
      [showCloseButton]="showCloseButton"
      [contentPadding]="contentPadding"
      (closed)="onModalClose()"
    >
      <div>Modal Content</div>
      <div slot="footer" *ngIf="showFooter">
        <button>Footer Button</button>
      </div>
    </ds-ui-modal>
  `,
  standalone: true,
  imports: [ModalComponent, CommonModule, ButtonComponent]
})
class TestHostComponent {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  
  isOpen = false;
  modalTitle = 'Test Modal';
  modalSize: 'sm' | 'md' | 'lg' | 'full' = 'md';
  backdropType: 'dimmed' | 'blur' | 'none' = 'dimmed';
  closeOnOutsideClick = true;
  closeOnEsc = true;
  showCloseButton = true;
  contentPadding = true;
  showFooter = true;
  
  modalClosedCount = 0;
  
  onModalClose(): void {
    this.modalClosedCount++;
    this.isOpen = false;
  }
}

describe('ModalComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.modalComponent).toBeTruthy();
  });

  it('should not display modal when not open', () => {
    const modalBackdrop = hostFixture.debugElement.query(By.css('.ds-modal-backdrop'));
    expect(modalBackdrop).toBeFalsy();
  });

  it('should display modal when open', () => {
    hostComponent.isOpen = true;
    hostFixture.detectChanges();
    
    const modalBackdrop = hostFixture.debugElement.query(By.css('.ds-modal-backdrop'));
    expect(modalBackdrop).toBeTruthy();
  });

  it('should display title when provided', () => {
    hostComponent.isOpen = true;
    hostFixture.detectChanges();
    
    const modalTitle = hostFixture.debugElement.query(By.css('.ds-modal-title'));
    expect(modalTitle.nativeElement.textContent).toBe(hostComponent.modalTitle);
  });

  it('should not display title when empty', () => {
    hostComponent.isOpen = true;
    hostComponent.modalTitle = '';
    hostFixture.detectChanges();
    
    const modalTitle = hostFixture.debugElement.query(By.css('.ds-modal-title'));
    expect(modalTitle).toBeFalsy();
  });

  it('should show close button when enabled', () => {
    hostComponent.isOpen = true;
    hostComponent.showCloseButton = true;
    hostFixture.detectChanges();
    
    const closeButton = hostFixture.debugElement.query(By.css('.ds-modal-close-btn'));
    expect(closeButton).toBeTruthy();
  });

  it('should not show close button when disabled', () => {
    hostComponent.isOpen = true;
    hostComponent.showCloseButton = false;
    hostFixture.detectChanges();
    
    const closeButton = hostFixture.debugElement.query(By.css('.ds-modal-close-btn'));
    expect(closeButton).toBeFalsy();
  });

  it('should emit closed event when close button is clicked', () => {
    hostComponent.isOpen = true;
    hostFixture.detectChanges();
    
    const closeButton = hostFixture.debugElement.query(By.css('.ds-modal-close-btn'));
    closeButton.nativeElement.click();
    hostFixture.detectChanges();
    
    expect(hostComponent.modalClosedCount).toBe(1);
    expect(hostComponent.isOpen).toBe(false);
  });

  it('should emit closed event when backdrop is clicked with closeOnOutsideClick enabled', () => {
    hostComponent.isOpen = true;
    hostComponent.closeOnOutsideClick = true;
    hostFixture.detectChanges();
    
    const backdrop = hostFixture.debugElement.query(By.css('.ds-modal-backdrop'));
    backdrop.triggerEventHandler('click', { target: backdrop.nativeElement, currentTarget: backdrop.nativeElement });
    hostFixture.detectChanges();
    
    expect(hostComponent.modalClosedCount).toBe(1);
  });

  it('should not emit closed event when backdrop is clicked with closeOnOutsideClick disabled', () => {
    hostComponent.isOpen = true;
    hostComponent.closeOnOutsideClick = false;
    hostFixture.detectChanges();
    
    const backdrop = hostFixture.debugElement.query(By.css('.ds-modal-backdrop'));
    backdrop.triggerEventHandler('click', { target: backdrop.nativeElement, currentTarget: backdrop.nativeElement });
    hostFixture.detectChanges();
    
    expect(hostComponent.modalClosedCount).toBe(0);
    expect(hostComponent.isOpen).toBe(true);
  });

  it('should apply the correct size class', () => {
    hostComponent.isOpen = true;
    hostComponent.modalSize = 'lg';
    hostFixture.detectChanges();
    
    let modalElement = hostFixture.debugElement.query(By.css('.ds-modal--lg'));
    expect(modalElement).toBeTruthy();
    
    hostComponent.modalSize = 'sm';
    hostFixture.detectChanges();
    
    modalElement = hostFixture.debugElement.query(By.css('.ds-modal--sm'));
    expect(modalElement).toBeTruthy();
  });

  it('should apply the correct backdrop class', () => {
    hostComponent.isOpen = true;
    hostComponent.backdropType = 'blur';
    hostFixture.detectChanges();
    
    let backdropElement = hostFixture.debugElement.query(By.css('.ds-modal-backdrop--blur'));
    expect(backdropElement).toBeTruthy();
    
    hostComponent.backdropType = 'none';
    hostFixture.detectChanges();
    
    backdropElement = hostFixture.debugElement.query(By.css('.ds-modal-backdrop--none'));
    expect(backdropElement).toBeTruthy();
  });

  it('should apply content padding when enabled', () => {
    hostComponent.isOpen = true;
    hostComponent.contentPadding = true;
    hostFixture.detectChanges();
    
    const contentElement = hostFixture.debugElement.query(By.css('.ds-modal-content--padded'));
    expect(contentElement).toBeTruthy();
  });

  it('should not apply content padding when disabled', () => {
    hostComponent.isOpen = true;
    hostComponent.contentPadding = false;
    hostFixture.detectChanges();
    
    const contentElement = hostFixture.debugElement.query(By.css('.ds-modal-content--padded'));
    expect(contentElement).toBeFalsy();
  });

  it('should show footer when footer content is provided', () => {
    hostComponent.isOpen = true;
    hostComponent.showFooter = true;
    hostFixture.detectChanges();
    
    const footerElement = hostFixture.debugElement.query(By.css('.ds-modal-footer'));
    expect(footerElement).toBeTruthy();
  });

  it('should have ARIA attributes for accessibility', () => {
    hostComponent.isOpen = true;
    hostFixture.detectChanges();
    
    const modalElement = hostFixture.debugElement.query(By.css('.ds-modal-backdrop'));
    expect(modalElement.attributes['role']).toBe('dialog');
    expect(modalElement.attributes['aria-modal']).toBe('true');
    expect(modalElement.attributes['aria-labelledby']).toBe('modal-title');
  });
});
