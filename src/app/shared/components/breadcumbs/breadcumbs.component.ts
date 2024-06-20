import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.css']
})
export class BreadcumbsComponent {

  public titulo: string = 'Testss';
  // public tituloSubs$: Subscription;


  constructor(private router: Router){
    // this.tituloSubs$ = this.getArgumentosRuta()
    // .subscribe( ({ titulo }) => {
    //     this.titulo = titulo;
    //     document.title = `AdminPro - ${ titulo }`;
    // });
  }
}
