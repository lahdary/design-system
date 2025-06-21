import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent } from './card.component';
import { Component } from '@angular/core';

// Host components for testing different card configurations
@Component({
  template: `
    <ds-ui-card>
      <ds-ui-card-body>Basic Card Content</ds-ui-card-body>
    </ds-ui-card>
  `,
  imports: [CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent],
  standalone: true
})
class BasicCardHost {}

@Component({
  template: `
    <ds-ui-card [elevation]="3" radius="lg" [bordered]="true">
      <ds-ui-card-header>Card Title</ds-ui-card-header>
      <ds-ui-card-body>Card Content</ds-ui-card-body>
      <ds-ui-card-footer>Card Footer</ds-ui-card-footer>
    </ds-ui-card>
  `,
  imports: [CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent],
  standalone: true
})
class CompleteCardHost {}

@Component({
  template: `
    <ds-ui-card [interactive]="true" [fullWidth]="true" padding="none">
      <ds-ui-card-body>Interactive Card</ds-ui-card-body>
    </ds-ui-card>
  `,
  imports: [CardComponent, CardBodyComponent],
  standalone: true
})
class InteractiveCardHost {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
        CardHeaderComponent,
        CardBodyComponent,
        CardFooterComponent,
        BasicCardHost,
        CompleteCardHost,
        InteractiveCardHost
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.elevation()).toBe(2);
    expect(component.radius()).toBe('md');
    expect(component.padding()).toBe('md');
    expect(component.bordered()).toBe(false);
    expect(component.interactive()).toBe(false);
    expect(component.fullWidth()).toBe(false);
  });

  it('should apply elevation classes correctly', () => {
    const hostFixture = TestBed.createComponent(CompleteCardHost);
    hostFixture.detectChanges();
    
    const cardElement = hostFixture.debugElement.query(By.css('.ds-card'));
    expect(cardElement.nativeElement.classList.contains('ds-card--elevation-3')).toBeTruthy();
  });

  it('should apply radius classes correctly', () => {
    const hostFixture = TestBed.createComponent(CompleteCardHost);
    hostFixture.detectChanges();
    
    const cardElement = hostFixture.debugElement.query(By.css('.ds-card'));
    expect(cardElement.nativeElement.classList.contains('ds-card--radius-lg')).toBeTruthy();
  });

  it('should apply border when bordered is true', () => {
    const hostFixture = TestBed.createComponent(CompleteCardHost);
    hostFixture.detectChanges();
    
    const cardElement = hostFixture.debugElement.query(By.css('.ds-card'));
    expect(cardElement.nativeElement.classList.contains('ds-card--bordered')).toBeTruthy();
  });

  it('should render with header, body and footer', () => {
    const hostFixture = TestBed.createComponent(CompleteCardHost);
    hostFixture.detectChanges();
    
    const headerElement = hostFixture.debugElement.query(By.directive(CardHeaderComponent));
    const bodyElement = hostFixture.debugElement.query(By.directive(CardBodyComponent));
    const footerElement = hostFixture.debugElement.query(By.directive(CardFooterComponent));
    
    expect(headerElement).toBeTruthy();
    expect(bodyElement).toBeTruthy();
    expect(footerElement).toBeTruthy();
    
    expect(headerElement.nativeElement.textContent).toContain('Card Title');
    expect(bodyElement.nativeElement.textContent).toContain('Card Content');
    expect(footerElement.nativeElement.textContent).toContain('Card Footer');
  });

  it('should apply interactive class when interactive is true', () => {
    const hostFixture = TestBed.createComponent(InteractiveCardHost);
    hostFixture.detectChanges();
    
    const cardElement = hostFixture.debugElement.query(By.css('.ds-card'));
    expect(cardElement.nativeElement.classList.contains('ds-card--interactive')).toBeTruthy();
  });

  it('should apply full-width class when fullWidth is true', () => {
    const hostFixture = TestBed.createComponent(InteractiveCardHost);
    hostFixture.detectChanges();
    
    const cardElement = hostFixture.debugElement.query(By.css('.ds-card'));
    expect(cardElement.nativeElement.classList.contains('ds-card--full-width')).toBeTruthy();
  });

  it('should apply padding class correctly', () => {
    const hostFixture = TestBed.createComponent(InteractiveCardHost);
    hostFixture.detectChanges();
    
    const cardElement = hostFixture.debugElement.query(By.css('.ds-card'));
    expect(cardElement.nativeElement.classList.contains('ds-card--padding-none')).toBeTruthy();
  });
});

describe('CardHeaderComponent', () => {
  let component: CardHeaderComponent;
  let fixture: ComponentFixture<CardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CardBodyComponent', () => {
  let component: CardBodyComponent;
  let fixture: ComponentFixture<CardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CardFooterComponent', () => {
  let component: CardFooterComponent;
  let fixture: ComponentFixture<CardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
