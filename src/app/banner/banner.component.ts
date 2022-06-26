import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  // @HostBinding('class.app-banner') get valid() { return !!this.message };
  @HostBinding('class.xxx')
  // hostClass = true;

  @Input() 
  message = '';

  @Input() 
  type: 'success' | 'info' | 'warn' | 'none' = 'none';

  @HostBinding('class')
  get hostElement(): string | void {
    if (this.type !== 'none') {
      return `app-banner-${this.type}`;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
