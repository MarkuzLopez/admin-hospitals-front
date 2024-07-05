import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userRegister } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm!: FormGroup;
	formSubmited = false;
	modelRegisterBD!: userRegister;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.initiForm();
	}

	private initiForm(): void {
		this.registerForm = this.formBuilder.group(
			{
				name: ['', Validators.required],
				email: ['', [Validators.email, Validators.required]],
				password: ['', [Validators.required, Validators.minLength(5)]],
				confirmPassword: ['', Validators.required],
				terms: [false, Validators.required]
			},
			{
				validators: this.passwordEquals('password', 'confirmPassword')
			}
		);
	}

	onSubmit(): void {
		this.formSubmited = true;
		if (this.registerForm.valid && !this.acceptTerms()) {
			console.log(this.registerForm.value, 'formulario posteado..');
			this.modelRegisterBD = {
				nombre: this.registerForm.get('name')?.value,
				email: this.registerForm.get('email')?.value,
				password: this.registerForm.get('password')?.value
			};

			this.authService.createUser(this.modelRegisterBD).subscribe(
				(user) => {
					// TODO pending for alerts msgs
					alert(`user ${user.usuario?.nombre} creado exitosamente`);
					this.router.navigateByUrl('/dashboard');
				},
				(error) => {
					// TODO pending for alerts msgs
					console.warn(error?.error?.msg, 'error al crear usuario');
				}
			);
		}
	}

	validatePassword(): boolean {
		const password = this.registerForm.get('password')?.value;
		const confirmPassword = this.registerForm.get('confirmPassword')?.value;
		return password !== confirmPassword && this.formSubmited ? true : false;
	}

	validateForm = (): boolean => this.registerForm.invalid && this.formSubmited;

	acceptTerms = (): boolean => !this.registerForm.get('terms')?.value && this.formSubmited;

	passwordEquals(password: string, confirmPassword: string) {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		return (formGroup: FormGroup) => {
			const passwordControl = formGroup.get(password);
			const confirmPasswordControl = formGroup.get(confirmPassword);
			if (passwordControl?.value === confirmPasswordControl?.value) {
				confirmPasswordControl?.setErrors(null);
			} else {
				confirmPasswordControl?.setErrors({ notEquals: true });
			}
		};
	}
}
