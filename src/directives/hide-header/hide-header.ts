import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[hide-header]',
  host : {
    '(ionScroll)' : 'onContentScroll($event)'
}})


export class HideHeaderDirective {

  @Input("header") header : HTMLElement ;
  headerHeight  ;
  scrollContent; 

  constructor(public rendrer: Renderer , public elementRef :ElementRef) {


    console.log('Hello HideHeaderDirective Directive');
  }

  onContentScroll(event){
  if(event.scrollTop > 56){
    this.rendrer.setElementStyle(this.header, "top", "-56px") ;
    this.rendrer.setElementStyle(this.scrollContent, "margin-top", "0px");
  }else{
    this.rendrer.setElementStyle(this.header, "top", "0px") ;
    this.rendrer.setElementStyle(this.scrollContent, "margin-top", "56px");
  }

  }

  ngOnInit(){
    this.headerHeight = this.header.clientHeight ;
    this.rendrer.setElementStyle(this.header, 'webkitTransition', 'top 700ms') ;

    this.scrollContent = this.elementRef.nativeElement.getElementsByClassName("scroll-content")[0];
    this.rendrer.setElementStyle(this.scrollContent,'webkitTransition', 'margin-top 700ms' ) ;

  }

}
