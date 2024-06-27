import { Component } from '@angular/core';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';

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
	imgTemplate!: string;
	user!: User;
	constructor(private authService: AuthService) {
		this.imgTemplate = this.authService.getImageUsr();
		this.user = this.authService.usuario;
	}

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
