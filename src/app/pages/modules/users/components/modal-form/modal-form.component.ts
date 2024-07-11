import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-modal-form',
	templateUrl: './modal-form.component.html',
	styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
	fileToUpload: File | null = null;
	fileName!: string;

	title?: string;
	closeBtnName?: string;
	list: string[] = [];
	formUser!: FormGroup<modalFormUser>;

	constructor(
		public bsModalRef: BsModalRef,
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {
		console.log('entraaa componen modal form');
	}

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			this.fileToUpload = file;
			this.fileName = file.name;
		}
	}

	setData(user: User): void {
		this.formUser.patchValue(user);
	}

	updateUser(): void {
		const userUpdate = {
			uid: this.formUser.value.uid || '',
			nombre: this.formUser.value.nombre || '',
			email: this.formUser.value.email || ''
		};
		this.authService.updateProfile(userUpdate).subscribe(() => {
			// TODO pending msj alert
			alert('usario actualizado');
			this.bsModalRef.hide();
		});
	}
}

export interface modalFormUser {
	nombre?: FormControl<string>;
	email?: FormControl<string>;
	uid?: FormControl<string>;
}
