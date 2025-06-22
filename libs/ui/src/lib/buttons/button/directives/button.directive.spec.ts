import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { ButtonDirective } from './button.directive';

// Create test host components with different button configurations
@Component({
  template: `<button ds-ui-button variant="primary">Primary</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class PrimaryButtonHost {}

@Component({
  template: `<button ds-ui-button variant="secondary">Secondary</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class SecondaryButtonHost {}

@Component({
  template: `<button ds-ui-button variant="tertiary">Tertiary</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class TertiaryButtonHost {}

@Component({
  template: `<button ds-ui-button [disabled]="true">Disabled</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class DisabledButtonHost {}

@Component({
  template: `<button ds-ui-button [loading]="true">Loading</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class LoadingButtonHost {}

@Component({
  template: `<button ds-ui-button [fullWidth]="true">Full Width</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class FullWidthButtonHost {}

@Component({
  template: `<button ds-ui-button type="submit">Submit</button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class SubmitButtonHost {}

@Component({
  template: `<button ds-ui-button (clicked)="handleClick($event)">
    Click
  </button>`,
  imports: [ButtonDirective],
  standalone: true,
})
class ClickButtonHost {
  handleClick = jest.fn();
}

describe('ButtonDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ButtonDirective,
        PrimaryButtonHost,
        SecondaryButtonHost,
        TertiaryButtonHost,
        DisabledButtonHost,
        LoadingButtonHost,
        FullWidthButtonHost,
        SubmitButtonHost,
        ClickButtonHost,
      ],
    }).compileComponents();
  });

  function getButtonElement(hostFixture: ComponentFixture<any>): DebugElement {
    return hostFixture.debugElement.query(By.directive(ButtonDirective));
  }

  it('should create an instance', () => {
    const hostFixture = TestBed.createComponent(PrimaryButtonHost);
    hostFixture.detectChanges();
    const directive =
      getButtonElement(hostFixture).injector.get(ButtonDirective);
    expect(directive).toBeTruthy();
  });

  it('should apply base button class', () => {
    const hostFixture = TestBed.createComponent(PrimaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(buttonElement.nativeElement.classList.contains('ds-button')).toBe(
      true
    );
  });

  it('should render with primary style', () => {
    const hostFixture = TestBed.createComponent(PrimaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(
      buttonElement.nativeElement.classList.contains('ds-button--primary')
    ).toBe(true);
  });

  it('should render with secondary style', () => {
    const hostFixture = TestBed.createComponent(SecondaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(
      buttonElement.nativeElement.classList.contains('ds-button--secondary')
    ).toBe(true);
  });

  it('should render with tertiary style', () => {
    const hostFixture = TestBed.createComponent(TertiaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(
      buttonElement.nativeElement.classList.contains('ds-button--tertiary')
    ).toBe(true);
  });

  it('should apply disabled state', () => {
    const hostFixture = TestBed.createComponent(DisabledButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(buttonElement.nativeElement.disabled).toBe(true);
    expect(
      buttonElement.nativeElement.classList.contains('ds-button--disabled')
    ).toBe(true);
  });

  it('should apply loading state', () => {
    const hostFixture = TestBed.createComponent(LoadingButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(
      buttonElement.nativeElement.classList.contains('ds-button--loading')
    ).toBe(true);
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should apply full width class', () => {
    const hostFixture = TestBed.createComponent(FullWidthButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(
      buttonElement.nativeElement.classList.contains('ds-button--full-width')
    ).toBe(true);
  });

  it('should use the correct button type', () => {
    const hostFixture = TestBed.createComponent(SubmitButtonHost);
    hostFixture.detectChanges();
    const buttonElement = getButtonElement(hostFixture);
    expect(buttonElement.nativeElement.type).toBe('submit');
  });

  it('should emit clicked event when clicked', () => {
    const hostFixture = TestBed.createComponent(ClickButtonHost);
    hostFixture.detectChanges();
    const hostInstance = hostFixture.componentInstance;
    const buttonElement = getButtonElement(hostFixture);

    buttonElement.nativeElement.click();
    expect(hostInstance.handleClick).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    // For testing with input signals, we need to use a component with property binding
    @Component({
      template: `<button
        ds-ui-button
        [disabled]="isDisabled"
        (clicked)="handleClick($event)"
      >
        Click
      </button>`,
      imports: [ButtonDirective],
      standalone: true,
    })
    class DynamicDisabledButtonHost {
      isDisabled = false;
      handleClick = jest.fn();
    }

    // Create the dynamic component
    const hostFixture = TestBed.createComponent(DynamicDisabledButtonHost);
    const hostInstance = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Verify click works when not disabled
    const buttonElement = getButtonElement(hostFixture);
    buttonElement.nativeElement.click();
    expect(hostInstance.handleClick).toHaveBeenCalled();

    // Reset the spy
    hostInstance.handleClick.mockReset();

    // Now disable the button through the host component property
    hostInstance.isDisabled = true;
    hostFixture.detectChanges();

    // Trigger click and verify no event is emitted
    buttonElement.nativeElement.click();
    expect(hostInstance.handleClick).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when loading', () => {
    // For testing with input signals, we need to use a component with property binding
    @Component({
      template: `<button
        ds-ui-button
        [loading]="isLoading"
        (clicked)="handleClick($event)"
      >
        Click
      </button>`,
      imports: [ButtonDirective],
      standalone: true,
    })
    class DynamicLoadingButtonHost {
      isLoading = false;
      handleClick = jest.fn();
    }

    // Create the dynamic component
    const hostFixture = TestBed.createComponent(DynamicLoadingButtonHost);
    const hostInstance = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Verify click works when not loading
    const buttonElement = getButtonElement(hostFixture);
    buttonElement.nativeElement.click();
    expect(hostInstance.handleClick).toHaveBeenCalled();

    // Reset the spy
    hostInstance.handleClick.mockReset();

    // Now set loading state through the host component property
    hostInstance.isLoading = true;
    hostFixture.detectChanges();

    // Trigger click and verify no event is emitted
    buttonElement.nativeElement.click();
    expect(hostInstance.handleClick).not.toHaveBeenCalled();
  });
});
