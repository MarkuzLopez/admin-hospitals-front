import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.css']
})
export class BreadcumbsComponent {

  public titulo!: string;
  public tituloSubs$: Subscription;


  constructor(private router: Router){
    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe( ({ titulo }) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${ titulo }`;
    });
  }

  getArgumentosRuta() {

    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }
}
