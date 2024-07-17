import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '@auth/models/user';
import { environment } from 'src/environment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { AuthService } from '@auth/service/auth.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	users!: User[];
	usersTemp!: User[];
	total!: number;
	loading!: boolean;
	sincePage = 0;
	img!: string;
	bsModalRef?: BsModalRef;
	role!: string;
	constructor(
		private userService: UserService,
		private modalService: BsModalService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.getUsers();
		this.img = environment.apiUrl + '/upload/usuarios';
	}

	getUsers(): void {
		this.loading = true;
		this.userService.getUsers(this.sincePage).subscribe((responseUser) => {
			this.users = responseUser.usuarios;
			this.total = responseUser.total;
			this.usersTemp = responseUser.usuarios;
			this.loading = false;
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSearch(event: any): void {
		const term = event.target.value;
		if (!term.trim()) {
			this.users = this.usersTemp;
			return;
		}
		this.searchUsers(term);
	}

	searchUsers(term: string): void {
		this.userService.searchUsers(term).subscribe({
			next: (res) => {
				this.users = res.resultado;
			},
			error: (err) => {
				console.log(err, 'erro');
			}
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

	openModalWithComponent(options: { dataUser: User | null; mode: 'edit' | 'create'; title: string }): void {
		const initialState: ModalOptions = {
			initialState: {
				title: options.title,
				mode: options.mode
			}
		};
		this.bsModalRef = this.modalService.show(ModalFormComponent, initialState);
		this.bsModalRef?.content.setData(options.dataUser);
		this.bsModalRef.onHidden?.subscribe(() => this.getUsers());
	}

	onCreate(): void {
		this.openModalWithComponent({
			dataUser: null,
			mode: 'create',
			title: 'Crear Usuario'
		});
	}

	onEdit(row: User): void {
		this.openModalWithComponent({
			dataUser: row,
			mode: 'edit',
			title: 'Editar Usuario'
		});
	}

	onDelete(uid: string): void {
		const response = confirm('Desea eliminar este usuario ');
		if (response) {
			this.userService.deleteUser(uid).subscribe((res) => {
				//todo alert pedding
				console.log(res, 'usaario eliminado');
				this.getUsers();
			});
		}
	}

	veryUserAuth(uid: string): void {
		this.authService.usuario.uid === uid ? alert('no se puede eliminar asi mismo.') : this.onDelete(uid);
	}

	updateProfile(user: User): void {
		this.userService.updateProfile(user).subscribe(() => this.getUsers());
	}
}
