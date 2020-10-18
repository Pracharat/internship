import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickScrollTopLeft]'
})
export class ClickScrollTopLeftDirective {

  @Input() top = 0;
  @Input() left = 0;
  @Input() behavior: ScrollBehavior = 'smooth';

  private get isValidTop(): boolean {
    return this.isValidNumber(this.top);
  }
  private get isValidLeft(): boolean {
    return this.isValidNumber(this.left);
  }
  private get isValidOptions(): boolean {
    return !!this.behavior && ['auto', 'smooth'].includes(this.behavior);
  }

  constructor() { }

  @HostListener('click')
  onClick() {
    const top = this.isValidTop ? this.top : 0;
    const left = this.isValidLeft ? this.left : 0;
    const behavior: ScrollBehavior = this.isValidOptions ? this.behavior : 'smooth';
    const options: ScrollToOptions = { top, left, behavior };
    window.scroll(options);
  }

  private isValidNumber(value: number): boolean {
    return value !== null && value !== undefined && typeof(value) === 'number';
  }

}
