import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

// Source: http://blog.enriqueoriol.com/2018/01/angular-universal-transferstate.html
// TransferState evita el parpadeo(o 'flickering') de la vista cuando se cargan datos de forma asíncrona, 
// por lo que evita las llamadas duplicadas

const USER_KEY = makeStateKey('users'); // clave para el estado 

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
    private state: TransferState, // *1
    private metaService: Meta,
    private titleService: Title
  ) { }

  // *1. Se inyecta TransferState para posteriormente iniciar el estado en la 1a petición en el servidor y 
  // recuperarla en el cliente sin duplicar llamadas.

  ngOnInit(): void {
    // this.usersList$ = this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(users => this.usersList = users);
    
    // asigno el estado USER_KEY si existe o nulo por defecto.
    this.usersList = this.state.get<[]>(USER_KEY, null);

    // Si es nulo aún está en el servidor y hace la petición REST.
    if(!this.usersList) {
      this.usersList$ = this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((users: Object | any) => {
        this.usersList = users; // asigno los datos a la propiedad usersList
        this.state.set<[]>(USER_KEY, users); // guardo los datos en el estado
      });
    }

    /*
     Ahora cuando se instancie de nuevo el componente en cliente, 
     el estado de USER_KEY se transferirá directamente a la propiedad usersList y 
     por tanto ya no se realizará la petición REST para cargar los datos iniciales,
     eliminando el parpadeo en pantalla.
    */

    this.titleService.setTitle('Users List-Demo Angular Universal');
    this.metaService.addTags([
      { name: 'keywords', content: 'users, angular users' },
      { name: 'description', content: 'Users List' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]);
  }

  ngOnDestroy(): void {
    if(this.usersList$) {
      this.usersList$.unsubscribe();
    }
    // this.usersList$.unsubscribe();
  }

}
