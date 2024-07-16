import { Component, OnInit } from '@angular/core';
import { IdleService } from './services/idle.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'medical-admin-web';
	constructor(private idService: IdleService) {}

	ngOnInit(): void {
		this.idService;
	}
}
