import { Component, OnInit } from '@angular/core';
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

	constructor(public bsModalRef: BsModalRef) {
		console.log('entraaa componen modal form');
	}

	ngOnInit(): void {
		console.log('enyra');
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			this.fileToUpload = file;
			this.fileName = file.name;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setData(post: any): void {
		console.log(post, 'sadas');
		// this.postForm.patchValue(post);
		// console.log(this.postForm.value, 'forms post');
	}
}
