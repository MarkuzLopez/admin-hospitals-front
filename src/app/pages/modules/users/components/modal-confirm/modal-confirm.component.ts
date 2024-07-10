import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-modal-confirm',
	templateUrl: './modal-confirm.component.html',
	styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {
	modalRef?: BsModalRef;
	message?: string;
	constructor(private modalService: BsModalService) {}

	confirm(): void {
		this.message = 'Confirmed!';
		this.modalRef?.hide();
	}

	decline(): void {
		this.message = 'Declined!';
		this.modalRef?.hide();
	}
}
