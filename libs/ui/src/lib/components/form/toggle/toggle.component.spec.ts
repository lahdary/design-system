import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleComponent } from './toggle.component';

// Create test host components with different toggle configurations
@Component({
  template: `<ds-ui-toggle label="Basic Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class BasicToggleHost {}

@Component({
  template: `<ds-ui-toggle [checked]="true" label="Checked Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class CheckedToggleHost {}

@Component({
  template: `<ds-ui-toggle [disabled]="true" label="Disabled Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class DisabledToggleHost {}

@Component({
  template: `<ds-ui-toggle [loading]="true" label="Loading Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class LoadingToggleHost {}

@Component({
  template: `<ds-ui-toggle size="sm" label="Small Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class SmallToggleHost {}

@Component({
  template: `<ds-ui-toggle size="lg" label="Large Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class LargeToggleHost {}

@Component({
  template: `<ds-ui-toggle labelPosition="left" label="Left Label Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class LeftLabelToggleHost {}

@Component({
  template: `<ds-ui-toggle [required]="true" label="Required Toggle"></ds-ui-toggle>`,
  imports: [ToggleComponent],
  standalone: true
})
class RequiredToggleHost {}

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToggleComponent,
        BasicToggleHost,
        CheckedToggleHost,
        DisabledToggleHost,
        LoadingToggleHost,
        SmallToggleHost,
        LargeToggleHost,
        LeftLabelToggleHost,
        RequiredToggleHost
      ],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(BasicToggleHost);
    hostFixture.detectChanges();
    component = hostFixture.debugElement.query(By.directive(ToggleComponent)).componentInstance;
    fixture = TestBed.createComponent(ToggleComponent);
    fixture.componentRef.setInput('label', 'Test Label')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    // Create a fresh component instance for testing default values
    const defaultsFixture = TestBed.createComponent(ToggleComponent);
    const defaultComponent = defaultsFixture.componentInstance;
    
    expect(defaultComponent.checked()).toBe(false);
    expect(defaultComponent.disabled()).toBe(false);
    expect(defaultComponent.loading()).toBe(false);
    expect(defaultComponent.size()).toBe('md');
    expect(defaultComponent.label()).toBe('');
    expect(defaultComponent.labelPosition()).toBe('right');
    expect(defaultComponent.required()).toBe(false);
    expect(defaultComponent.id()).toMatch(/^ds-toggle-/);
  });

  it('should render the toggle with label', () => {
    const hostFixture = TestBed.createComponent(BasicToggleHost);
    hostFixture.detectChanges();
    
    const label = hostFixture.debugElement.query(By.css('.ds-toggle-label')).nativeElement;
    expect(label.textContent.trim()).toBe('Basic Toggle');
  });

  it('should render the toggle as checked', () => {
    const hostFixture = TestBed.createComponent(CheckedToggleHost);
    hostFixture.detectChanges();
    
    const toggleElement = hostFixture.debugElement.query(By.css('.ds-toggle--checked'));
    expect(toggleElement).toBeTruthy();
    
    const inputElement = hostFixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.checked).toBe(true);
  });

  it('should render the toggle as disabled', () => {
    const hostFixture = TestBed.createComponent(DisabledToggleHost);
    hostFixture.detectChanges();
    
    const toggleElement = hostFixture.debugElement.query(By.css('.ds-toggle--disabled'));
    expect(toggleElement).toBeTruthy();
    
    const inputElement = hostFixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.disabled).toBe(true);
  });

  it('should render the toggle with loading state', () => {
    const hostFixture = TestBed.createComponent(LoadingToggleHost);
    hostFixture.detectChanges();
    
    const spinnerElement = hostFixture.debugElement.query(By.css('.ds-toggle-spinner'));
    expect(spinnerElement).toBeTruthy();
    
    const inputElement = hostFixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.disabled).toBe(true);
  });

  it('should apply small size class', () => {
    const hostFixture = TestBed.createComponent(SmallToggleHost);
    hostFixture.detectChanges();
    
    const toggleElement = hostFixture.debugElement.query(By.css('.ds-toggle--sm'));
    expect(toggleElement).toBeTruthy();
  });

  it('should apply large size class', () => {
    const hostFixture = TestBed.createComponent(LargeToggleHost);
    hostFixture.detectChanges();
    
    const toggleElement = hostFixture.debugElement.query(By.css('.ds-toggle--lg'));
    expect(toggleElement).toBeTruthy();
  });

  it('should position label on the left', () => {
    const hostFixture = TestBed.createComponent(LeftLabelToggleHost);
    hostFixture.detectChanges();
    
    const label = hostFixture.debugElement.query(By.css('.ds-toggle-label--left'));
    expect(label).toBeTruthy();
  });

  it('should show required indicator when required', () => {
    const hostFixture = TestBed.createComponent(RequiredToggleHost);
    hostFixture.detectChanges();
    
    const requiredIndicator = hostFixture.debugElement.query(By.css('.ds-toggle-required-indicator'));
    expect(requiredIndicator).toBeTruthy();
    expect(requiredIndicator.nativeElement.textContent).toBe('*');
  });

  it('should emit checked change event when clicked', () => {
    // Create a fresh instance of the component
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    jest.spyOn(component.checkedChange, 'emit');
    
    // Directly call the method that would be triggered on click
    component.onToggleChange();
    
    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });

  it('should not emit event when disabled', () => {
    // Create a fresh instance of the component
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    
    // Set disabled state to true
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    jest.spyOn(component.checkedChange, 'emit');
    
    // Directly call the method that would be triggered on click
    component.onToggleChange();
    
    expect(component.checkedChange.emit).not.toHaveBeenCalled();
  });

  it('should not emit event when loading', () => {
    // Create a standalone toggle component for more direct testing
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    
    // Set loading state to true
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    
    jest.spyOn(component.checkedChange, 'emit');
    
    // Directly call the method that would be triggered on click
    component.onToggleChange();
    
    expect(component.checkedChange.emit).not.toHaveBeenCalled();
  });

  it('should have appropriate ARIA attributes', () => {
    @Component({
      template: `<ds-ui-toggle [checked]="true" [required]="true" ariaLabel="Test toggle"></ds-ui-toggle>`,
      imports: [ToggleComponent],
      standalone: true
    })
    class AriaToggleHost {}
    
    const testFixture = TestBed.createComponent(AriaToggleHost);
    testFixture.detectChanges();
    
    const inputElement = testFixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.getAttribute('aria-checked')).toBe('true');
    expect(inputElement.getAttribute('aria-required')).toBe('true');
    expect(inputElement.getAttribute('aria-label')).toBe('Test toggle');
  });
});
