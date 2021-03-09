import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private metaService: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Home-Demo Angular Universal');
    this.metaService.addTags([
      { name: 'keywords', content: 'angular, universal' },
      { name: 'description', content: 'Demo Angular Universal' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]);
  }

}
