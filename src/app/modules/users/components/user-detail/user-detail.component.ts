import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  private userDetail$: Subscription;
  public userDetail: Object;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userDetail$ = this.http.get(`https://jsonplaceholder.typicode.com/users/${ this.activatedRoute.snapshot.params.id }`)
                                .subscribe(user => this.userDetail = user);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.userDetail$.unsubscribe();
  }

}
