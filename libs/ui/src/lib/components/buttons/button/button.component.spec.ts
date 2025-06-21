import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';

// Create test host components with different button configurations
@Component({
  template: `<ds-ui-button variant="primary">Primary</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class PrimaryButtonHost {}

@Component({
  template: `<ds-ui-button variant="secondary">Secondary</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class SecondaryButtonHost {}

@Component({
  template: `<ds-ui-button variant="tertiary">Tertiary</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class TertiaryButtonHost {}

@Component({
  template: `<ds-ui-button [disabled]="true">Disabled</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class DisabledButtonHost {}

@Component({
  template: `<ds-ui-button [loading]="true">Loading</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class LoadingButtonHost {}

@Component({
  template: `<ds-ui-button [fullWidth]="true">Full Width</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class FullWidthButtonHost {}

@Component({
  template: `<ds-ui-button type="submit">Submit</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true
})
class SubmitButtonHost {}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ButtonComponent,
        PrimaryButtonHost,
        SecondaryButtonHost,
        TertiaryButtonHost,
        DisabledButtonHost,
        LoadingButtonHost,
        FullWidthButtonHost,
        SubmitButtonHost
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have primary variant by default', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should render with primary style', () => {
    const hostFixture = TestBed.createComponent(PrimaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('.ds-button--primary'));
    expect(buttonElement).toBeTruthy();
  });

  it('should render with secondary style', () => {
    const hostFixture = TestBed.createComponent(SecondaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('.ds-button--secondary'));
    expect(buttonElement).toBeTruthy();
  });

  it('should render with tertiary style', () => {
    const hostFixture = TestBed.createComponent(TertiaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('.ds-button--tertiary'));
    expect(buttonElement).toBeTruthy();
  });

  it('should render as disabled when disabled is true', () => {
    const hostFixture = TestBed.createComponent(DisabledButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
    expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should show loading state when loading is true', () => {
    const hostFixture = TestBed.createComponent(LoadingButtonHost);
    hostFixture.detectChanges();
    const spinnerElement = hostFixture.debugElement.query(By.css('.ds-button__spinner'));
    expect(spinnerElement).toBeTruthy();
    const buttonElement = hostFixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('should apply full width when fullWidth is true', () => {
    const hostFixture = TestBed.createComponent(FullWidthButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('.ds-button--full-width'));
    expect(buttonElement).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    const spy = jest.spyOn(component, 'onClick');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should set the button type', () => {
    const hostFixture = TestBed.createComponent(SubmitButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.type).toBe('submit');
  });

  it('should update pressed state on mouse interactions', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    
    // Test mousedown
    buttonElement.dispatchEvent(new MouseEvent('mousedown'));
    expect(component.pressed()).toBe(true);
    
    // Test mouseup
    buttonElement.dispatchEvent(new MouseEvent('mouseup'));
    expect(component.pressed()).toBe(false);
    
    // Test mousedown again and then mouseleave
    buttonElement.dispatchEvent(new MouseEvent('mousedown'));
    expect(component.pressed()).toBe(true);
    buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
    expect(component.pressed()).toBe(false);
  });
});
