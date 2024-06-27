import { Component } from '@angular/core';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	imgTemplate!: string;
	user!: User;
	constructor(private authService: AuthService) {
		this.user = authService.usuario;
		this.imgTemplate = authService.getImageUsr();
	}

	onLogout(): void {
		this.authService.onLogout();
	}
}
