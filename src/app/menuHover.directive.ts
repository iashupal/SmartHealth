import { Directive, HostListener, Renderer, ElementRef  } from '@angular/core';

@Directive({
    selector: "[cmenuHover]"
  })

  export class menuHoverDirective {
    constructor(private el: ElementRef,
                private renderer: Renderer) {
      // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
    }
  
    @HostListener('mouseover') onMouseOver() { 
        let part = this.el.nativeElement.querySelector('.left-menu-items') 
        this.renderer.setElementStyle(part, 'display', 'block'); 
        //console.log(1);
      }
      @HostListener('mouseout') onMouseOut() { 
        let part = this.el.nativeElement.querySelector('.left-menu-items') 
        this.renderer.setElementStyle(part, 'display', 'none'); 
        //console.log(2);
      }
  }