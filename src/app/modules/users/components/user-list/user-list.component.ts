import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.usersList$ = this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(users => this.usersList = users);
  }

  ngOnDestroy(): void {
    this.usersList$.unsubscribe();
  }

}
