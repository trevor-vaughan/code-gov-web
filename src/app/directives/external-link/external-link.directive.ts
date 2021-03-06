import { Directive, ElementRef, Output, Renderer } from '@angular/core';
import { ModalService } from '../../services/modal';

@Directive({
  selector: '[external-link]',
  host: {
    '(click)': 'onClick($event)'
  }
})

export class ExternalLinkDirective {
  modalContent: Object;
  url: string;

  constructor(private el: ElementRef, private modalService: ModalService) {
    this.modalContent = {
      description: 'But you probably knew that already.',
      description2: 'Continue to the link below:',
      title: 'You are now leaving Code.gov',
      url: ''
    };
  }

  isExternalLink(url) {
    return !this.url.match(/(.+\.)?([^.]+)\.(?:gov|mil)$/);
  }

  onClick(event: any) {
    this.url = this.el.nativeElement.getAttribute('href');

    if (this.isExternalLink(this.url)) {
      event.preventDefault();
      this.modalContent['url'] = this.url;
      this.modalService.showModal(this.modalContent);
    }
  }
}
