import { 
  Component, 
  OnInit,
  Injectable, 
  Inject, 
  PLATFORM_ID,
  Optional
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID)
    private platformID: any,
    private metaService: Meta,
    private titleService: Title,
    @Optional()
    @Inject(REQUEST) private request: Request
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Home-Demo Angular Universal');
    this.metaService.addTags([
      { name: 'keywords', content: 'angular, universal' },
      { name: 'description', content: 'Demo Angular Universal' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]);

    // https://www.newline.co/@eigenjoy/angular-ssr-the-browser-is-not-the-server--2b398f60
    if (isPlatformBrowser(this.platformID)) {
      console.log(this.platformID);
      console.log(window.navigator.language);
    } else {
      console.log('server logic here');
      let lang = (this.request.headers["accept-language"] || "").substring(0, 5);
      console.log(lang);
    }
  }

}
