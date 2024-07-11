import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/models/user';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService, userUpdate } from '../../services/user.service';
import { UploadFileService } from '@pages/services/upload-file.service';

@Component({
	selector: 'app-modal-form',
	templateUrl: './modal-form.component.html',
	styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
	fileToUpload!: File;
	title?: string;
	closeBtnName?: string;
	list: string[] = [];
	formUser!: FormGroup<modalFormUser>;
	imgTemp!: string | ArrayBuffer | null | undefined;

	constructor(
		public bsModalRef: BsModalRef,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private uploadService: UploadFileService
	) {}

	ngOnInit(): void {
		this.formUser = this.initForm();
	}

	private initForm(): FormGroup {
		return this.formBuilder.group<modalFormUser>({
			uid: new FormControl('', { nonNullable: true }),
			nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
			email: new FormControl('', { nonNullable: true, validators: [Validators.required] })
		});
	}

	setData(user: User): void {
		this.formUser.patchValue(user);
	}

	updateUser(): void {
		const userData = this.formUser.value as userUpdate;
		this.userService.updateProfile(userData).subscribe(() => {
			// TODO pending msj alert
			alert('usario actualizado');
			this.bsModalRef.hide();
		});
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			this.fileToUpload = file;
			this.previewImg();
		}
	}

	previewImg(): void {
		if (this.fileToUpload) {
			this.imgTemp = null;
		}

		const reader = new FileReader();
		reader.readAsDataURL(this.fileToUpload);

		reader.onloadend = (): void => {
			this.imgTemp = reader.result;
		};
	}

	uploadImagen(): void {
		if (this.fileToUpload) {
			const formData = new FormData();
			formData.append('imagen', this.fileToUpload);

			this.uploadService
				.updatePhoto(formData, 'usuarios', this.formUser.value.uid || '')
				.then(() => {
					this.bsModalRef.hide();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.warn('error al subir archivo');
		}
	}
}

export interface modalFormUser {
	nombre?: FormControl<string>;
	email?: FormControl<string>;
	uid?: FormControl<string>;
}
