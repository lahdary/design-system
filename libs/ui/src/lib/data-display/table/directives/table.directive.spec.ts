import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableDirective } from './table.directive';

@Component({
  template: `
    <table
      ds-table
      [size]="size"
      [density]="density"
      [border]="border"
      [striped]="striped"
      [hover]="hover"
    >
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1-1</td>
          <td>Cell 1-2</td>
        </tr>
        <tr>
          <td>Cell 2-1</td>
          <td>Cell 2-2</td>
        </tr>
      </tbody>
    </table>
  `,
  standalone: true,
  imports: [TableDirective],
})
class TestComponent {
  size = 'md';
  density = 'default';
  border = 'horizontal';
  striped = false;
  hover = true;
}

describe('TableDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let tableElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, TableDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tableElement = fixture.debugElement.query(
      By.directive(TableDirective)
    ).nativeElement;
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement.query(By.directive(TableDirective));
    expect(directive).toBeTruthy();
  });

  it('should have default classes applied', () => {
    expect(tableElement.classList.contains('ds-table')).toBeTruthy();
    expect(tableElement.classList.contains('ds-table--md')).toBeTruthy();
    expect(tableElement.classList.contains('ds-table--default')).toBeTruthy();
    expect(
      tableElement.classList.contains('ds-table--border-horizontal')
    ).toBeTruthy();
    expect(tableElement.classList.contains('ds-table--hover')).toBeTruthy();
  });

  it('should update classes when inputs change', () => {
    // Change size to small
    component.size = 'sm';
    fixture.detectChanges();
    expect(tableElement.classList.contains('ds-table--sm')).toBeTruthy();
    expect(tableElement.classList.contains('ds-table--md')).toBeFalsy();

    // Enable striped rows
    component.striped = true;
    fixture.detectChanges();
    expect(tableElement.classList.contains('ds-table--striped')).toBeTruthy();

    // Change border to all
    component.border = 'all';
    fixture.detectChanges();
    expect(
      tableElement.classList.contains('ds-table--border-all')
    ).toBeTruthy();
    expect(
      tableElement.classList.contains('ds-table--border-horizontal')
    ).toBeFalsy();
  });

  it('should have proper ARIA role', () => {
    expect(tableElement.getAttribute('role')).toBe('table');
  });
});
