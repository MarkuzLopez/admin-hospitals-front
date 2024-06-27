import { Component } from '@angular/core';

export interface MenuItems {
	title: string;
	icon: string;
	route: string;
}

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
	menuItems: MenuItems[] = [
		{
			title: 'Dashboard',
			icon: 'mdi mdi-gauge',
			route: '/'
		},
		{
			title: 'Hospitals',
			icon: 'mdi mdi-gauge',
			route: '/hospitals'
		},
		{
			title: 'Medicos',
			icon: 'mdi mdi-gauge',
			route: '/doctors'
		},
		{
			title: 'Users',
			icon: 'mdi mdi-gauge',
			route: '/'
		}
	];
}
