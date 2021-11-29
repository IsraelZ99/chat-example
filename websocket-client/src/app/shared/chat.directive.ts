import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adChatHost]'
})
export class ChatDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
   }

}
