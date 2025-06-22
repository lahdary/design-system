import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';

// Create test host components with different button configurations
@Component({
  template: `<ds-ui-button variant="primary">Primary</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
})
class PrimaryButtonHost {}

@Component({
  template: `<ds-ui-button variant="secondary">Secondary</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
})
class SecondaryButtonHost {}

@Component({
  template: `<ds-ui-button variant="tertiary">Tertiary</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
})
class TertiaryButtonHost {}

@Component({
  template: `<ds-ui-button [disabled]="true">Disabled</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
})
class DisabledButtonHost {}

@Component({
  template: `<ds-ui-button [loading]="true">Loading</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
})
class LoadingButtonHost {}

@Component({
  template: `<ds-ui-button [fullWidth]="true">Full Width</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
})
class FullWidthButtonHost {}

@Component({
  template: `<ds-ui-button type="submit">Submit</ds-ui-button>`,
  imports: [ButtonComponent],
  standalone: true,
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
        SubmitButtonHost,
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
    const buttonElement = hostFixture.debugElement.query(
      By.css('.ds-button--primary')
    );
    expect(buttonElement).toBeTruthy();
  });

  it('should render with secondary style', () => {
    const hostFixture = TestBed.createComponent(SecondaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(
      By.css('.ds-button--secondary')
    );
    expect(buttonElement).toBeTruthy();
  });

  it('should render with tertiary style', () => {
    const hostFixture = TestBed.createComponent(TertiaryButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(
      By.css('.ds-button--tertiary')
    );
    expect(buttonElement).toBeTruthy();
  });

  it('should apply disabled state', () => {
    // Create a temporary host component to test the disabled state
    @Component({
      template: `<ds-ui-button [disabled]="true">Disabled</ds-ui-button>`,
      imports: [ButtonComponent],
      standalone: true,
    })
    class TempDisabledButtonHost {}

    const hostFixture = TestBed.createComponent(TempDisabledButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('button'));
    // Check the disabled attribute is set
    expect(buttonElement.nativeElement.disabled).toBe(true);
    // Check ARIA attribute is also set
    expect(buttonElement.nativeElement.getAttribute('aria-disabled')).toBe(
      'true'
    );
  });

  it('should apply loading state', () => {
    const hostFixture = TestBed.createComponent(LoadingButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(
      By.css('.ds-button--loading')
    );
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should apply full width class', () => {
    const hostFixture = TestBed.createComponent(FullWidthButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(
      By.css('.ds-button--full-width')
    );
    expect(buttonElement).toBeTruthy();
  });

  it('should use the correct button type', () => {
    const hostFixture = TestBed.createComponent(SubmitButtonHost);
    hostFixture.detectChanges();
    const buttonElement = hostFixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.type).toBe('submit');
  });

  it('should emit clicked event when clicked', () => {
    const clickedSpy = jest.spyOn(component.clicked, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    expect(clickedSpy).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    // For testing with input signals, we need to use a component with property binding
    @Component({
      template: `<ds-ui-button
        [disabled]="isDisabled"
        (clicked)="handleClick($event)"
        >Click</ds-ui-button
      >`,
      imports: [ButtonComponent],
      standalone: true,
    })
    class DisabledButtonTestHost {
      isDisabled = false;
      handleClick = jest.fn();
    }

    // Create the test component
    const testFixture = TestBed.createComponent(DisabledButtonTestHost);
    const testInstance = testFixture.componentInstance;
    testFixture.detectChanges();

    // Verify click works when not disabled
    const buttonElement = testFixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    expect(testInstance.handleClick).toHaveBeenCalled();

    // Reset the spy
    testInstance.handleClick.mockReset();

    // Disable the button and check it doesn't emit clicked event
    testInstance.isDisabled = true;
    testFixture.detectChanges();
    buttonElement.nativeElement.click();
    expect(testInstance.handleClick).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when loading', () => {
    // For testing with input signals, we need to use a component with property binding
    @Component({
      template: `<ds-ui-button
        [loading]="isLoading"
        (clicked)="handleClick($event)"
        >Click</ds-ui-button
      >`,
      imports: [ButtonComponent],
      standalone: true,
    })
    class LoadingButtonTestHost {
      isLoading = false;
      handleClick = jest.fn();
    }

    // Create the test component
    const testFixture = TestBed.createComponent(LoadingButtonTestHost);
    const testInstance = testFixture.componentInstance;
    testFixture.detectChanges();

    // Verify click works when not loading
    const buttonElement = testFixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    expect(testInstance.handleClick).toHaveBeenCalled();

    // Reset the spy
    testInstance.handleClick.mockReset();

    // Set the button to loading state and check it doesn't emit clicked event
    testInstance.isLoading = true;
    testFixture.detectChanges();
    buttonElement.nativeElement.click();
    expect(testInstance.handleClick).not.toHaveBeenCalled();
  });
});
