import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditSaveComponent } from './form-edit-save.component';

describe('FormEditSaveComponent', () => {
	let component: FormEditSaveComponent;
	let fixture: ComponentFixture<FormEditSaveComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FormEditSaveComponent]
		});
		fixture = TestBed.createComponent(FormEditSaveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
