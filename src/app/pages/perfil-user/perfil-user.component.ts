/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';
import { UserService } from '@pages/modules/users/services/user.service';
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
	imgTemp!: string | ArrayBuffer | null | undefined;
	typeCollectionDB!: string | 'usuarios' | 'medico' | 'hospitales';
	constructor(
		private fbBuilder: FormBuilder,
		private authService: AuthService,
		private uploapService: UploadFileService,
		private userService: UserService
	) {
		this.user = this.authService.usuario;
		this.initForm();
	}

	private initForm(): void {
		this.formProfile = this.fbBuilder.group({
			uid: [this.user.uid],
			nombre: [this.user.nombre, Validators.required],
			email: [this.user.email, [Validators.required, Validators.email]]
		});
	}

	updateUser(): void {
		if (this.formProfile.valid) {
			this.userService.updateProfile(this.formProfile.value).subscribe({
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

	// /**
	//  *  Method typed with Event
	//  * @param event return img url string
	//  */
	// onFileSelected22(event: Event): void {
	// 	const input = event.target as HTMLInputElement;
	// 	if (input.files && input.files[0]) {
	// 		const file = input.files[0];
	// 		const reader = new FileReader();
	// 		reader.onload = (e): void => {
	// 			this.imgTemp = e.target?.result;
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// }

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

			this.uploapService
				.updatePhoto(formData, 'usuarios', this.user.uid)
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
