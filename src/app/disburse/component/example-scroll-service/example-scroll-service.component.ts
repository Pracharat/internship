import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ScrollService } from '@app-services/common/scroll.service';

@Component({
  selector: 'app-example-scroll-service',
  templateUrl: './example-scroll-service.component.html',
  styleUrls: ['./example-scroll-service.component.scss']
})
export class ExampleScrollServiceComponent implements OnInit {

  @ViewChild('element', { static: false }) element: ElementRef;

  constructor(
    private scrollService: ScrollService,
  ) { }

  ngOnInit() {
  }

  scrollToTop() {
    const options = { top: 0 };
    this.scrollService.scrollToTopLeft(options);
  }

  scrollToElement() {
    this.scrollService.scrollToElement(this.element.nativeElement);
  }

}
