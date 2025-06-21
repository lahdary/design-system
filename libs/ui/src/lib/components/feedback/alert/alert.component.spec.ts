import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import { Component } from '@angular/core';

// Host components for testing different alert configurations
@Component({
  template: `<ds-ui-alert>Info alert content</ds-ui-alert>`,
  imports: [AlertComponent],
  standalone: true
})
class InfoAlertHost {}

@Component({
  template: `<ds-ui-alert variant="success" title="Success Title">Success alert content</ds-ui-alert>`,
  imports: [AlertComponent],
  standalone: true
})
class SuccessAlertWithTitleHost {}

@Component({
  template: `<ds-ui-alert variant="warning" [dismissible]="true">Warning alert content</ds-ui-alert>`,
  imports: [AlertComponent],
  standalone: true
})
class DismissibleWarningAlertHost {}

@Component({
  template: `<ds-ui-alert variant="error" [solid]="true" [elevated]="true">Error alert content</ds-ui-alert>`,
  imports: [AlertComponent],
  standalone: true
})
class SolidErrorAlertHost {}

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlertComponent,
        InfoAlertHost,
        SuccessAlertWithTitleHost,
        DismissibleWarningAlertHost,
        SolidErrorAlertHost
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.title()).toBe('');
    expect(component.variant()).toBe('info');
    expect(component.dismissible()).toBe(false);
    expect(component.hasIcon()).toBe(true);
    expect(component.bordered()).toBe(true);
    expect(component.solid()).toBe(false);
    expect(component.elevated()).toBe(false);
    expect(component.visible()).toBe(true);
  });

  it('should render info alert by default', () => {
    const hostFixture = TestBed.createComponent(InfoAlertHost);
    hostFixture.detectChanges();
    
    const alertElement = hostFixture.debugElement.query(By.css('.ds-alert--info'));
    expect(alertElement).toBeTruthy();
  });

  it('should display title when provided', () => {
    const hostFixture = TestBed.createComponent(SuccessAlertWithTitleHost);
    hostFixture.detectChanges();
    
    const titleElement = hostFixture.debugElement.query(By.css('.ds-alert__title'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('Success Title');
  });

  it('should render with success variant', () => {
    const hostFixture = TestBed.createComponent(SuccessAlertWithTitleHost);
    hostFixture.detectChanges();
    
    const alertElement = hostFixture.debugElement.query(By.css('.ds-alert--success'));
    expect(alertElement).toBeTruthy();
  });

  it('should show close button when dismissible is true', () => {
    const hostFixture = TestBed.createComponent(DismissibleWarningAlertHost);
    hostFixture.detectChanges();
    
    const closeButton = hostFixture.debugElement.query(By.css('.ds-alert__close-btn'));
    expect(closeButton).toBeTruthy();
  });

  it('should hide alert when close button is clicked', () => {
    const hostFixture = TestBed.createComponent(DismissibleWarningAlertHost);
    hostFixture.detectChanges();
    
    const closeButton = hostFixture.debugElement.query(By.css('.ds-alert__close-btn'));
    closeButton.nativeElement.click();
    hostFixture.detectChanges();
    
    const alertElement = hostFixture.debugElement.query(By.css('.ds-alert'));
    expect(alertElement).toBeFalsy();
  });

  it('should emit closed event when closed', () => {
    jest.spyOn(component.closed, 'emit');
    component.closeAlert();
    expect(component.closed.emit).toHaveBeenCalled();
    expect(component.visible()).toBe(false);
  });

  it('should apply solid and elevated classes when enabled', () => {
    const hostFixture = TestBed.createComponent(SolidErrorAlertHost);
    hostFixture.detectChanges();
    
    const alertElement = hostFixture.debugElement.query(By.css('.ds-alert'));
    expect(alertElement.classes['ds-alert--solid']).toBeTruthy();
    expect(alertElement.classes['ds-alert--elevated']).toBeTruthy();
    expect(alertElement.classes['ds-alert--error']).toBeTruthy();
  });

  it('should display the correct icon based on variant', () => {
    // Testing info variant
    const infoFixture = TestBed.createComponent(InfoAlertHost);
    infoFixture.detectChanges();
    let iconElement = infoFixture.debugElement.query(By.css('.ds-alert__icon'));
    expect(iconElement.nativeElement.textContent.trim()).toBe('info');
    
    // Testing success variant
    const successFixture = TestBed.createComponent(SuccessAlertWithTitleHost);
    successFixture.detectChanges();
    iconElement = successFixture.debugElement.query(By.css('.ds-alert__icon'));
    expect(iconElement.nativeElement.textContent.trim()).toBe('check_circle');
    
    // Testing warning variant
    const warningFixture = TestBed.createComponent(DismissibleWarningAlertHost);
    warningFixture.detectChanges();
    iconElement = warningFixture.debugElement.query(By.css('.ds-alert__icon'));
    expect(iconElement.nativeElement.textContent.trim()).toBe('warning');
    
    // Testing error variant
    const errorFixture = TestBed.createComponent(SolidErrorAlertHost);
    errorFixture.detectChanges();
    iconElement = errorFixture.debugElement.query(By.css('.ds-alert__icon'));
    expect(iconElement.nativeElement.textContent.trim()).toBe('error');
  });

  it('should have appropriate ARIA attributes', () => {
    const hostFixture = TestBed.createComponent(InfoAlertHost);
    hostFixture.detectChanges();
    
    const alertElement = hostFixture.debugElement.query(By.css('.ds-alert')).nativeElement;
    expect(alertElement.getAttribute('role')).toBe('alert');
  });
});
