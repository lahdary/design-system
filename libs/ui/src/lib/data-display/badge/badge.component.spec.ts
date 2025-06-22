import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';
import { Component } from '@angular/core';

// Host components for testing different badge configurations
@Component({
  template: `<ds-ui-badge>Default</ds-ui-badge>`,
  imports: [BadgeComponent],
  standalone: true
})
class DefaultBadgeHost {}

@Component({
  template: `<ds-ui-badge variant="success" size="sm">Success</ds-ui-badge>`,
  imports: [BadgeComponent],
  standalone: true
})
class SuccessSmallBadgeHost {}

@Component({
  template: `<ds-ui-badge variant="error" [outline]="true">Error</ds-ui-badge>`,
  imports: [BadgeComponent],
  standalone: true
})
class OutlineErrorBadgeHost {}

@Component({
  template: `<ds-ui-badge variant="info" [rounded]="true">Info</ds-ui-badge>`,
  imports: [BadgeComponent],
  standalone: true
})
class RoundedInfoBadgeHost {}

@Component({
  template: `<ds-ui-badge variant="warning" icon="warning" size="lg">Warning</ds-ui-badge>`,
  imports: [BadgeComponent],
  standalone: true
})
class IconBadgeHost {}

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BadgeComponent,
        DefaultBadgeHost,
        SuccessSmallBadgeHost,
        OutlineErrorBadgeHost,
        RoundedInfoBadgeHost,
        IconBadgeHost
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.variant()).toBe('primary');
    expect(component.size()).toBe('md');
    expect(component.outline()).toBe(false);
    expect(component.rounded()).toBe(false);
    expect(component.icon()).toBeNull();
  });

  it('should render primary badge by default', () => {
    const hostFixture = TestBed.createComponent(DefaultBadgeHost);
    hostFixture.detectChanges();
    
    const badgeElement = hostFixture.debugElement.query(By.css('.ds-badge--primary'));
    expect(badgeElement).toBeTruthy();
    expect(badgeElement.nativeElement.textContent.trim()).toBe('Default');
  });

  it('should render success variant with small size', () => {
    const hostFixture = TestBed.createComponent(SuccessSmallBadgeHost);
    hostFixture.detectChanges();
    
    const badgeElement = hostFixture.debugElement.query(By.css('.ds-badge'));
    expect(badgeElement.classes['ds-badge--success']).toBeTruthy();
    expect(badgeElement.classes['ds-badge--sm']).toBeTruthy();
    expect(badgeElement.nativeElement.textContent.trim()).toBe('Success');
  });

  it('should apply outline class when outline is true', () => {
    const hostFixture = TestBed.createComponent(OutlineErrorBadgeHost);
    hostFixture.detectChanges();
    
    const badgeElement = hostFixture.debugElement.query(By.css('.ds-badge'));
    expect(badgeElement.classes['ds-badge--error']).toBeTruthy();
    expect(badgeElement.classes['ds-badge--outline']).toBeTruthy();
  });

  it('should apply rounded class when rounded is true', () => {
    const hostFixture = TestBed.createComponent(RoundedInfoBadgeHost);
    hostFixture.detectChanges();
    
    const badgeElement = hostFixture.debugElement.query(By.css('.ds-badge'));
    expect(badgeElement.classes['ds-badge--info']).toBeTruthy();
    expect(badgeElement.classes['ds-badge--rounded']).toBeTruthy();
  });

  it('should render with an icon when provided', () => {
    const hostFixture = TestBed.createComponent(IconBadgeHost);
    hostFixture.detectChanges();
    
    const iconElement = hostFixture.debugElement.query(By.css('.ds-badge__icon'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent.trim()).toBe('warning');
  });

  it('should apply large size class correctly', () => {
    const hostFixture = TestBed.createComponent(IconBadgeHost);
    hostFixture.detectChanges();
    
    const badgeElement = hostFixture.debugElement.query(By.css('.ds-badge'));
    expect(badgeElement.classes['ds-badge--lg']).toBeTruthy();
  });

  it('should render badge content correctly', () => {
    const hostFixture = TestBed.createComponent(DefaultBadgeHost);
    hostFixture.detectChanges();
    
    const badgeElement = hostFixture.debugElement.query(By.css('.ds-badge'));
    expect(badgeElement.nativeElement.textContent.trim()).toBe('Default');
  });
});
