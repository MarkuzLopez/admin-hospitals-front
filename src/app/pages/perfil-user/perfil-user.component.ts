/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';
import { UploadFileService } from '@pages/services/upload-file.service';

@Component({
	selector: 'app-perfil-user',
	templateUrl: './perfil-user.component.html',
	styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent {
	formProfile!: FormGroup;
	user!: User;
	imgUpload!: boolean;
	fileImage!: File;
	imgTemp!: any | null;
	typeCollectionDB!: string | 'usuarios' | 'medico' | 'hospitales';

	constructor(
		private fbBuilder: FormBuilder,
		private authService: AuthService,
		private uploaService: UploadFileService
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

	onFileSelected(event: any): void {
		this.fileImage = event.target.files[0];
		this.previewImg();
	}

	previewImg(): void {
		if (this.fileImage) {
			this.imgTemp = null;
		}

		const reader = new FileReader();
		reader.readAsDataURL(this.fileImage);

		reader.onloadend = (): void => {
			this.imgTemp = reader.result;
		};
	}

	uploadImagen(): void {
		if (this.fileImage) {
			const formData = new FormData();
			formData.append('imagen', this.fileImage);

			this.uploaService
				.updatePhoto(formData, 'usuarios')
				.then((img) => {
					console.log(img, 'values');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.warn('error al subir archivo');
		}
	}
}
