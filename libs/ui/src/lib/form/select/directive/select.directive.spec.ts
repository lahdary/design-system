import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectOption } from '../select.types';
import { SelectDirective } from './select.directive';

@Component({
  template: `
    <select
      ds-ui-select
      [options]="options"
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [loading]="loading"
      [error]="error"
      [required]="required"
      [multiple]="multiple"
      [size]="size"
      (valueChange)="onValueChange($event)"
    ></select>
  `,
  standalone: true,
  imports: [SelectDirective],
})
class TestHostComponent {
  options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4', group: 'Group 1' },
    { value: 'option5', label: 'Option 5', group: 'Group 1' },
    { value: 'option6', label: 'Option 6', group: 'Group 2' },
  ];
  value: string | string[] | null = null;
  placeholder = 'Select an option';
  disabled = false;
  loading = false;
  error: string | null = null;
  required = false;
  multiple = false;
  size = 'md';

  onValueChange(newValue: string | string[] | null): void {}
}

describe('SelectDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let selectElement: HTMLSelectElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
  });

  it('should create', () => {
    expect(selectElement).toBeTruthy();
  });

  it('should apply the correct CSS classes', () => {
    expect(selectElement.classList).toContain('ds-select');
    expect(selectElement.classList).toContain('ds-select--md');

    hostComponent.size = 'sm';
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ds-select--sm');

    hostComponent.size = 'lg';
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ds-select--lg');
  });

  it('should generate options from input', () => {
    // Expect 7 options (1 placeholder + 6 data options)
    expect(selectElement.options.length).toBe(7);

    // Check placeholder
    expect(selectElement.options[0].textContent).toBe('Select an option');
    expect(selectElement.options[0].value).toBe('');

    // Check a regular option
    expect(selectElement.options[1].textContent).toBe('Option 1');
    expect(selectElement.options[1].value).toBe('option1');
  });

  it('should mark options as disabled', () => {
    // Third option (index 2) should be disabled
    expect(selectElement.options[3].disabled).toBe(true);
  });

  it('should set the selected value', () => {
    hostComponent.value = 'option2';
    fixture.detectChanges();
    expect(selectElement.value).toBe('option2');
  });

  it('should emit valueChange when selection changes', () => {
    const valueChangeSpy = jest.spyOn(hostComponent, 'onValueChange');

    // Simulate selection change
    selectElement.value = 'option1';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith('option1');
  });

  it('should handle disabled state', () => {
    hostComponent.disabled = true;
    fixture.detectChanges();

    expect(selectElement.disabled).toBe(true);
    expect(selectElement.classList).toContain('ds-select--disabled');
  });

  it('should handle loading state', () => {
    hostComponent.loading = true;
    fixture.detectChanges();

    expect(selectElement.disabled).toBe(true);
    expect(selectElement.classList).toContain('ds-select--disabled');
  });

  it('should handle error state', () => {
    hostComponent.error = 'This field is required';
    fixture.detectChanges();

    expect(selectElement.classList).toContain('ds-select--error');
    expect(selectElement.getAttribute('aria-invalid')).toBe('true');
  });

  it('should handle required attribute', () => {
    hostComponent.required = true;
    fixture.detectChanges();

    expect(selectElement.required).toBe(true);
  });

  it('should handle multiple selection', () => {
    hostComponent.multiple = true;
    hostComponent.value = ['option1', 'option2'];
    fixture.detectChanges();

    expect(selectElement.multiple).toBe(true);

    // Need to wait for options to be created
    fixture.whenStable().then(() => {
      // First option is the placeholder (index 0), then our actual options
      // For the specific options, verify by value rather than index
      const option1 = Array.from(selectElement.options).find(
        (opt) => opt.value === 'option1'
      );
      const option2 = Array.from(selectElement.options).find(
        (opt) => opt.value === 'option2'
      );

      expect(option1?.selected).toBe(true);
      expect(option2?.selected).toBe(true);
    });
  });
});
