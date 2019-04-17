import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[adataClickOutside]'
})
export class ClickOutsideDirective implements OnInit {
  @Input() adataClickOutside: boolean;
  @Output() clickedOutside = new EventEmitter<void>();

  el: HTMLElement;

  @HostListener('document:click', ['$event'])
  onClickEvent(event) {
    if (this.adataClickOutside) {
      let isInside: boolean;
      let traverse = event.target;
      do {
        if (traverse === this.el) {
          isInside = true;
          break;
        }
        traverse = traverse.parentElement;
      } while (traverse);

      if (!isInside) {
        this.clickedOutside.emit();
      }
    }
  }

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {}
}
