import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.css'],
})
export class BreadcumbsComponent {
  public title!: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter<any>((event) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe((data) => {
        console.log(data, 'ada');
        
        // this.title = data.title;
      });

    // this.tituloSubs$ = this.getArgumentosRuta()
    // .subscribe( ({ titulo }) => {
    //     this.titulo = titulo;
    //     document.title = `AdminPro - ${ titulo }`;
    // });
  }
}
