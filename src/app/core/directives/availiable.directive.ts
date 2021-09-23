import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAvailiable]',
})
export class AvailiableDirective implements OnChanges {
  @Input() appAvailiable = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.appAvailiable > 0) {
      if (this.appAvailiable > 19) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      } else if (this.appAvailiable < 5) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'yellow');
      }
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'gray');
    }
  }
}
