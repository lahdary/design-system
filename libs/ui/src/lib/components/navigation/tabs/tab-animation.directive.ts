import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * A directive to apply animation classes to the tab content elements
 * based on the parent tabs component's animated property
 */
@Directive({
  selector: '[dsTabAnimation]',
  standalone: true
})
export class TabAnimationDirective implements OnChanges {
  @Input('dsTabAnimation') animated = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('animated' in changes) {
      this.applyAnimationClass();
    }
  }

  private applyAnimationClass(): void {
    // Find all tab content elements
    const tabContents = this.el.nativeElement.querySelectorAll('.ds-tab-content');
    
    // Apply or remove animation class
    tabContents.forEach((element: HTMLElement) => {
      if (this.animated) {
        element.classList.add('ds-tab-content--animated');
      } else {
        element.classList.remove('ds-tab-content--animated');
      }
    });
  }
}
