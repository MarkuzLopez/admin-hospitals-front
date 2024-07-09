import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '@auth/models/user';
import { environment } from 'src/environment';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	users!: User[];
	total!: number;
	loading!: boolean;
	sincePage = 0;
	img!: string;
	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.getUsers();
		this.img = environment.apiUrl + '/upload/usuarios';
	}

	getUsers(): void {
		this.loading = true;
		this.userService.getUsers(this.sincePage).subscribe((responseUser) => {
			this.users = responseUser.usuarios;
			this.total = responseUser.total;
			this.loading = false;
		});
	}

	changePage(value: number): void {
		this.sincePage += value;
		if (this.sincePage < 0) {
			this.sincePage = 0;
		} else if (this.sincePage >= this.total) {
			this.sincePage -= value;
		}
		this.getUsers();
	}
}
