/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';

@Component({
	selector: 'app-perfil-user',
	templateUrl: './perfil-user.component.html',
	styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent {
	formProfile!: FormGroup;
	user!: User;
	imgUpload!: boolean;
	image!: File;
	imgTemp: any = null;

	constructor(
		private fbBuilder: FormBuilder,
		private authService: AuthService
	) {
		this.user = this.authService.usuario;
		this.initForm();
	}

	private initForm(): void {
		this.formProfile = this.fbBuilder.group({
			nombre: [this.user.nombre, Validators.required],
			email: [this.user.email, [Validators.required, Validators.email]]
		});
	}

	updateUser(): void {
		if (this.formProfile.valid) {
			this.authService.updateProfile(this.formProfile.value).subscribe({
				next: (res) => {
					alert(`Usuario ${res.usuario?.nombre}  actualizado`);
					this.user.email = res.usuario?.email || '';
					this.user.nombre = res.usuario?.nombre || '';
				},
				error: (err) => {
					console.warn(err);
				}
			});
		}
	}

	onChangeImg(event: Event): void {
		console.log(event);
	}

	uploadImagen(): void {
		console.log('entrooo function');
	}
}
