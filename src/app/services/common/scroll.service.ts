import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollToTopLeft(scrollOptions: ScrollToOptions = {
      top: 0,
      left: 0,
      behavior: 'smooth',
  }) {
    const top = this.isValidNumber(scrollOptions.top) ? scrollOptions.top : 0;
    const left = this.isValidNumber(scrollOptions.left) ? scrollOptions.left : 0;
    const behavior = this.isValidBehavior(scrollOptions.behavior) ? scrollOptions.behavior : 'smooth';
    const options: ScrollToOptions = { top, left, behavior };
    window.scrollTo(options);
  }

  scrollToElement(element: HTMLElement, scrollLogical?: ScrollLogicalPosition) {
    const behavior: ScrollBehavior = 'smooth';
    const block: ScrollLogicalPosition = scrollLogical || 'start';
    const inline: ScrollLogicalPosition = scrollLogical || 'start';
    const options: ScrollIntoViewOptions = { behavior, block, inline };
    element.scrollIntoView(options);
  }

  private isValidNumber(value: number): boolean {
    return value !== null && value !== undefined && typeof(value) === 'number';
  }

  private isValidBehavior(behavior: ScrollBehavior): boolean {
    return !!behavior && ['auto', 'smooth'].includes(behavior);
  }

}
