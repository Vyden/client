import { Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Directive({
  selector: '[appOnCreate]'
})
export class OnCreateDirective {
  // https://stackoverflow.com/questions/38787839/call-a-function-inside-ngfor-in-angular2

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  ngOnInit() {
    this.onCreate.emit('dummy');
  }

}
