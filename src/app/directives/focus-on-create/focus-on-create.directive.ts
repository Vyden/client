import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusOnCreate]'
})
export class FocusOnCreateDirective {
  // https://stackoverflow.com/questions/34522306/focus-on-newly-added-input-element

  constructor(public renderer: Renderer, public elementRef: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    }, 0)
  }

}
