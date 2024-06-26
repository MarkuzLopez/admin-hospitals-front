import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-breadcumbs',
	templateUrl: './breadcumbs.component.html',
	styleUrls: ['./breadcumbs.component.css']
})
export class BreadcumbsComponent {
	currentRoute!: string;

	constructor(private router: Router) {
		this.getRouteActivate();
	}

	getRouteActivate(): void {
		this.router.events
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.pipe(filter((event: any) => event instanceof ActivationEnd))
			.subscribe((event: ActivationEnd) => {
				this.currentRoute = event.snapshot.routeConfig?.path || 'root';
			});
	}
}
