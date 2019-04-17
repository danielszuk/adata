import {
  Input,
  AfterViewInit,
  ElementRef,
  HostListener,
  Directive
} from '@angular/core';
import { nextDiggingCycle } from '../../../utils/next-digging-cycle';

@Directive({
  selector: '[cleAutosize]'
})
export class AutosizeDirective implements AfterViewInit {
  private el: HTMLElement;

  private clientWidth: number;

  constructor(public element: ElementRef) {
    this.el = element.nativeElement;
    this.clientWidth = this.el.clientWidth;
  }

  private MinHeight: string;
  @Input('minHeight')
  get minHeight(): string {
    return this.MinHeight;
  }
  set minHeight(val: string) {
    this.MinHeight = val;
    this.updateMinHeight();
  }

  private MaxHeight: string;
  @Input('maxHeight')
  get maxHeight(): string {
    return this.MaxHeight;
  }
  set maxHeight(val: string) {
    this.MaxHeight = val;
    this.updateMaxHeight();
  }

  @HostListener('window:resize', ['$event.target'])
  hostOnResize(textArea: HTMLTextAreaElement): void {
    // Only apply adjustment if element width had changed.
    if (this.el.clientWidth === this.clientWidth) {
      return;
    }
    this.clientWidth = this.element.nativeElement.clientWidth;
    this.adjust();
  }

  @HostListener('input', ['$event.target'])
  hostOnInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  async ngAfterViewInit() {
    // set element resize allowed manually by user
    const style = window.getComputedStyle(this.el, null);
    if (style.resize === 'both') {
      this.el.style.resize = 'horizontal';
    } else if (style.resize === 'vertical') {
      this.el.style.resize = 'none';
    }
    // run first adjust (wait until values may added to field with 0-timeout)
    await nextDiggingCycle();
    this.adjust();
  }

  private adjust(): void {
    // perform height adjustments after input changes, if height is different
    if (
      this.el.style.height ===
      this.element.nativeElement.scrollHeight + 'px'
    ) {
      return;
    }
    this.el.style.overflow = 'hidden';
    this.el.style.height = 'auto';
    this.el.style.height = this.el.scrollHeight + 'px';
  }

  private updateMinHeight(): void {
    // Set textarea min height if input defined
    this.el.style.minHeight = this.MinHeight + 'px';
  }

  private updateMaxHeight(): void {
    // Set textarea max height if input defined
    this.el.style.maxHeight = this.MaxHeight + 'px';
  }
}
