import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectOption } from '../select.types';
import { SelectComponent } from './select.component';

// Create a test host component to properly set signal-based inputs
@Component({
  template: `
    <ds-select
      [options]="options"
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [loading]="loading"
      [error]="error"
      [required]="required"
      [multiple]="multiple"
      [searchable]="searchable"
      [size]="size"
      [clearable]="clearable"
      (valueChange)="onValueChange($event)"
      (opened)="onOpened()"
      (closed)="onClosed()"
      (search)="onSearch($event)"
    ></ds-select>
  `,
  standalone: true,
  imports: [SelectComponent],
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
  searchable = false;
  size = 'md';
  clearable = false;

  onValueChange(newValue: string | string[] | null): void {}
  onOpened(): void {}
  onClosed(): void {}
  onSearch(term: string): void {}
}

describe('SelectComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    const selectComponent = hostFixture.debugElement.query(
      By.directive(SelectComponent)
    );
    expect(selectComponent).toBeTruthy();
  });

  it('should display placeholder when no value is selected', () => {
    const placeholderText = 'Select an item';
    hostComponent.placeholder = placeholderText;
    hostComponent.value = null;
    hostFixture.detectChanges();

    const selectButton = hostFixture.debugElement.query(
      By.css('.ds-select')
    ).nativeElement;
    expect(selectButton.textContent.trim()).toContain(placeholderText);
  });

  it('should display selected option label', () => {
    hostComponent.value = 'option1';
    hostFixture.detectChanges();

    const selectButton = hostFixture.debugElement.query(
      By.css('.ds-select')
    ).nativeElement;
    expect(selectButton.textContent.trim()).toContain('Option 1');
  });

  it('should open dropdown when clicked', () => {
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    const dropdown = hostFixture.debugElement.query(
      By.css('.ds-select__dropdown')
    );
    expect(dropdown).toBeTruthy();
  });

  it('should emit valueChange when option is selected', () => {
    const valueChangeSpy = jest.spyOn(hostComponent, 'onValueChange');

    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    // Click on option
    const optionElements = hostFixture.debugElement.queryAll(
      By.css('.ds-select__option:not(.ds-select__option--disabled)')
    );
    optionElements[0].triggerEventHandler('click', {});
    hostFixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith('option1');
  });

  it('should not select disabled options', () => {
    const valueChangeSpy = jest.spyOn(hostComponent, 'onValueChange');

    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    // Find the disabled option
    const disabledOption = hostFixture.debugElement.query(
      By.css('.ds-select__option--disabled')
    );
    disabledOption.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    expect(valueChangeSpy).not.toHaveBeenCalled();
  });

  it('should handle keyboard navigation', () => {
    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('keydown', {
      key: 'Enter',
      preventDefault: () => {},
    });
    hostFixture.detectChanges();

    // Navigate down
    selectButton.triggerEventHandler('keydown', {
      key: 'ArrowDown',
      preventDefault: () => {},
    });
    hostFixture.detectChanges();

    // Select with enter
    const valueChangeSpy = jest.spyOn(hostComponent, 'onValueChange');
    selectButton.triggerEventHandler('keydown', {
      key: 'Enter',
      preventDefault: () => {},
    });
    hostFixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalled();
  });

  it('should close dropdown when Escape is pressed', () => {
    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    expect(
      hostFixture.debugElement.query(By.css('.ds-select__dropdown'))
    ).toBeTruthy();

    // Press Escape
    selectButton.triggerEventHandler('keydown', {
      key: 'Escape',
      preventDefault: () => {},
    });
    hostFixture.detectChanges();

    expect(
      hostFixture.debugElement.query(By.css('.ds-select__dropdown'))
    ).toBeFalsy();
  });

  it('should emit search event when searching', () => {
    // Make the select searchable
    hostComponent.searchable = true;

    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    // Find search input
    const searchInput = hostFixture.debugElement.query(
      By.css('.ds-select__search-input')
    );
    expect(searchInput).toBeTruthy();

    // Trigger search
    const searchSpy = jest.spyOn(hostComponent, 'onSearch');
    const searchText = 'test';

    // Create and dispatch an input event with the search text
    const inputEvent = new Event('input');
    Object.defineProperty(inputEvent, 'target', {
      value: { value: searchText },
      enumerable: true,
    });
    searchInput.triggerEventHandler('input', inputEvent);
    hostFixture.detectChanges();

    expect(searchSpy).toHaveBeenCalledWith(searchText);
  });

  it('should filter options when searching', () => {
    // Make the select searchable
    hostComponent.searchable = true;

    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    // Find search input and set value
    const searchInput = hostFixture.debugElement.query(
      By.css('.ds-select__search-input')
    );
    // Create and dispatch an input event with the search text
    const inputEvent = new Event('input');
    Object.defineProperty(inputEvent, 'target', {
      value: { value: 'Option 1' },
      enumerable: true,
    });
    searchInput.triggerEventHandler('input', inputEvent);
    hostFixture.detectChanges();

    // Check filtered options
    const optionElements = hostFixture.debugElement.queryAll(
      By.css('.ds-select__option')
    );
    expect(optionElements.length).toBe(1);
  });

  it('should display multiple values when multiple selection is enabled', () => {
    hostComponent.multiple = true;
    hostComponent.value = ['option1', 'option2'];
    hostFixture.detectChanges();

    const selectButton = hostFixture.debugElement.query(
      By.css('.ds-select')
    ).nativeElement;
    expect(selectButton.textContent.trim()).toContain('Option 1, Option 2');
  });

  it('should handle multiple selection correctly', () => {
    hostComponent.multiple = true;
    hostComponent.value = ['option1'];
    hostFixture.detectChanges();

    // Open dropdown
    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    selectButton.triggerEventHandler('click', {});
    hostFixture.detectChanges();

    // Select another option
    const valueChangeSpy = jest.spyOn(hostComponent, 'onValueChange');
    const optionElements = hostFixture.debugElement.queryAll(
      By.css('.ds-select__option:not(.ds-select__option--disabled)')
    );
    optionElements[1].triggerEventHandler('click', {});
    hostFixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith(['option1', 'option2']);
  });

  it('should show spinner when loading', () => {
    hostComponent.loading = true;
    hostFixture.detectChanges();

    const spinner = hostFixture.debugElement.query(
      By.css('.ds-select__spinner')
    );
    expect(spinner).toBeTruthy();
  });

  it('should be disabled when disabled is true', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    expect(selectButton.nativeElement.classList).toContain(
      'ds-select--disabled'
    );
    expect(selectButton.nativeElement.disabled).toBe(true);
  });

  it('should show error state', () => {
    const errorMessage = 'This field is required';
    hostComponent.error = errorMessage;
    hostFixture.detectChanges();

    const selectButton = hostFixture.debugElement.query(By.css('.ds-select'));
    expect(selectButton.nativeElement.classList).toContain('ds-select--error');

    const errorElement = hostFixture.debugElement.query(
      By.css('.ds-select__error')
    );
    expect(errorElement.nativeElement.textContent).toContain(errorMessage);
  });

  it('should clear selection when clearable and clear button is clicked', () => {
    hostComponent.value = 'option1';
    hostComponent.clearable = true;
    hostFixture.detectChanges();

    const valueChangeSpy = jest.spyOn(hostComponent, 'onValueChange');
    const clearButton = hostFixture.debugElement.query(
      By.css('.ds-select__clear-btn')
    );
    clearButton.triggerEventHandler('click', { stopPropagation: () => {} });
    hostFixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith(null);
  });
});
