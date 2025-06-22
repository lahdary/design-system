import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TabsComponent } from './tabs.component';
import { TabItemComponent } from './tab-item.component';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <ds-ui-tabs 
      [activeIndex]="activeTabIndex" 
      [orientation]="orientation"
      [appearance]="appearance"
      [position]="position"
      [stretch]="stretch"
      [animated]="animated"
      (activeIndexChange)="onTabChange($event)"
    >
      <ds-ui-tab-item title="Tab 1" icon="home">Content for Tab 1</ds-ui-tab-item>
      <ds-ui-tab-item title="Tab 2" badge="3">Content for Tab 2</ds-ui-tab-item>
      <ds-ui-tab-item title="Tab 3" [disabled]="disableThirdTab">Content for Tab 3</ds-ui-tab-item>
    </ds-ui-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabItemComponent, CommonModule]
})
class TestHostComponent {
  @ViewChild(TabsComponent) tabsComponent!: TabsComponent;
  
  activeTabIndex = 0;
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  appearance: 'filled' | 'outlined' | 'minimal' = 'filled';
  position: 'top' | 'bottom' = 'top';
  stretch = false;
  animated = true;
  disableThirdTab = false;
  
  tabChangedEvents: number[] = [];
  
  onTabChange(index: number): void {
    this.activeTabIndex = index;
    this.tabChangedEvents.push(index);
  }
}

describe('TabsComponent', () => {
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
    expect(hostComponent.tabsComponent).toBeTruthy();
  });

  it('should display tab items correctly', () => {
    const tabLabels = hostFixture.debugElement.queryAll(By.css('.ds-tab-button-text'));
    expect(tabLabels.length).toBe(3);
    expect(tabLabels[0].nativeElement.textContent.trim()).toContain('Tab 1');
    expect(tabLabels[1].nativeElement.textContent.trim()).toContain('Tab 2');
  });

  it('should mark the first tab as active by default', () => {
    const activeTab = hostFixture.debugElement.query(By.css('.ds-tab-button--active'));
    expect(activeTab).toBeTruthy();
    
    const activeTabLabel = activeTab.nativeElement.textContent.trim();
    expect(activeTabLabel).toContain('Tab 1');
    
    const activeContent = hostFixture.debugElement.query(By.css('.ds-tab-content--active'));
    expect(activeContent.nativeElement.textContent.trim()).toBe('Content for Tab 1');
  });

  it('should change active tab when clicked', () => {
    const tabButtons = hostFixture.debugElement.queryAll(By.css('.ds-tab-button'));
    tabButtons[1].nativeElement.click();
    hostFixture.detectChanges();
    
    const activeTab = hostFixture.debugElement.query(By.css('.ds-tab-button--active'));
    expect(activeTab.nativeElement.textContent.trim()).toContain('Tab 2');
    
    const activeContent = hostFixture.debugElement.query(By.css('.ds-tab-content--active'));
    expect(activeContent.nativeElement.textContent.trim()).toBe('Content for Tab 2');
    
    expect(hostComponent.tabChangedEvents).toContain(1);
  });

  it('should not activate disabled tabs', () => {
    hostComponent.disableThirdTab = true;
    hostFixture.detectChanges();
    
    const disabledTab = hostFixture.debugElement.queryAll(By.css('.ds-tab-button'))[2];
    expect(disabledTab.nativeElement.classList.contains('ds-tab-button--disabled')).toBe(true);
    
    disabledTab.nativeElement.click();
    hostFixture.detectChanges();
    
    // Active tab should not change to the disabled tab
    const activeTab = hostFixture.debugElement.query(By.css('.ds-tab-button--active'));
    expect(activeTab.nativeElement.textContent.trim()).not.toContain('Tab 3');
  });

  it('should display icons when provided', () => {
    const tabWithIcon = hostFixture.debugElement.queryAll(By.css('.ds-tab-button'))[0];
    const icon = tabWithIcon.query(By.css('.ds-tab-button-icon'));
    expect(icon).toBeTruthy();
  });

  it('should display badges when provided', () => {
    const tabWithBadge = hostFixture.debugElement.queryAll(By.css('.ds-tab-button'))[1];
    const badge = tabWithBadge.query(By.css('.ds-tab-button-badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent.trim()).toBe('3');
  });

  it('should apply vertical orientation class', () => {
    hostComponent.orientation = 'vertical';
    hostFixture.detectChanges();
    
    const tabsContainer = hostFixture.debugElement.query(By.css('.ds-tabs'));
    expect(tabsContainer.nativeElement.classList.contains('ds-tabs--vertical')).toBe(true);
  });

  it('should apply outlined appearance class', () => {
    hostComponent.appearance = 'outlined';
    hostFixture.detectChanges();
    
    const tabsNavContainer = hostFixture.debugElement.query(By.css('.ds-tabs-nav'));
    expect(tabsNavContainer.nativeElement.classList.contains('ds-tabs-nav--outlined')).toBe(true);
  });

  it('should apply bottom position class', () => {
    hostComponent.position = 'bottom';
    hostFixture.detectChanges();
    
    const tabsContainer = hostFixture.debugElement.query(By.css('.ds-tabs'));
    expect(tabsContainer.nativeElement.classList.contains('ds-tabs--bottom')).toBe(true);
  });

  it('should apply stretch class', () => {
    hostComponent.stretch = true;
    hostFixture.detectChanges();
    
    const tabsNavContainer = hostFixture.debugElement.query(By.css('.ds-tabs-nav'));
    expect(tabsNavContainer.nativeElement.classList.contains('ds-tabs-nav--stretch')).toBe(true);
  });

  it('should toggle animation class based on animated property', () => {
    // First test with animation disabled
    hostComponent.animated = false;
    hostFixture.detectChanges();
    
    let tabContent = hostFixture.debugElement.query(By.css('.ds-tab-content'));
    expect(tabContent.nativeElement.classList.contains('ds-tab-content--animated')).toBe(false);
    
    // Then test with animation enabled
    hostComponent.animated = true;
    hostFixture.detectChanges();
    
    tabContent = hostFixture.debugElement.query(By.css('.ds-tab-content'));
    expect(tabContent.nativeElement.classList.contains('ds-tab-content--animated')).toBe(true);
  });

  it('should provide proper ARIA attributes for accessibility', () => {
    const tabsElement = hostFixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tabsElement).toBeTruthy();
    
    const tabElements = hostFixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabElements.length).toBe(3);
    
    const tabPanels = hostFixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
    expect(tabPanels.length).toBe(3);
    
    // Check that the active tab is properly indicated
    expect(tabElements[0].attributes['aria-selected']).toBe('true');
    
    // Just verify the aria-hidden attribute exists with the expected value
    expect(tabPanels[1].attributes['aria-hidden']).toBe('true');
  });
});
