import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private usersList$: Subscription
  public usersList: Object;

  constructor(
    private http: HttpClient,
    private metaService: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.usersList$ = this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(users => this.usersList = users);
    this.titleService.setTitle('Users List-Demo Angular Universal');
    this.metaService.addTags([
      { name: 'keywords', content: 'users, angular users' },
      { name: 'description', content: 'Users List' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]);
  }

  ngOnDestroy(): void {
    this.usersList$.unsubscribe();
  }

}
