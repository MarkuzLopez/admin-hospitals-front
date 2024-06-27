import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
	@ViewChild('googleBtn') googleBtn!: ElementRef;

	formLogin!: FormGroup;
	submitted = false;
	msg!: string;
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.initiForm();
	}

	ngAfterViewInit(): void {
		this.googleInit();
	}

	googleInit(): void {
		google.accounts.id.initialize({
			client_id: '475664057489-8frl1kjpffg1c5llb8r9vq996qlod27e.apps.googleusercontent.com',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			callback: (response: any) => this.handleCredentialResponse(response) // for reeference the component y not In.
		});
		google.accounts.id.renderButton(
			// document.getElementById("buttonDiv"),
			this.googleBtn.nativeElement,
			{ theme: 'outline', size: 'large' } // customization attributes
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleCredentialResponse(response: any): void {
		console.log('Encoded JWT ID token: ' + response.credential);
		this.authService.loginGoogleSignIn(response.credential).subscribe(
			() => {
				console.log('response', response);
				this.router.navigateByUrl('/dashboard');
			},
			(error) => {
				console.log(error);
			}
		);
	}

	initiForm(): void {
		this.formLogin = this.formBuilder.group({
			email: [localStorage.getItem('email') || null, [Validators.required, Validators.email]],
			password: ['', Validators.required],
			remember: [false]
		});
	}

	onLogin(): void {
		this.submitted = true;
		if (this.formLogin.valid) {
			// TODO  alerts for msg
			this.authService.loginUser(this.formLogin.value).subscribe(
				() => {
					this.rememberEmail();
					this.router.navigateByUrl('/dashboard');
				},
				({ error }) => {
					// TODO  alerts for msg
					console.error(error, 'errorr', error?.msg);
				}
			);
		}
	}

	rememberEmail(): void {
		this.formLogin.get('remember')?.value
			? localStorage.setItem('email', this.formLogin.get('email')?.value)
			: localStorage.removeItem('email');
	}

	validateForm = (): boolean => this.formLogin.invalid && this.submitted;

	signUp = (): Promise<boolean> => this.router.navigateByUrl('/register');
}
