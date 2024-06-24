import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin!: FormGroup;
  submitted = false;
  msg!: string;
  constructor(private router:  Router, private formBuilder: FormBuilder, private authService:  AuthService){
  }
  
  ngOnInit(): void {    
    this.initiForm();    
  }


  initiForm(): void { 
    this.formLogin = this.formBuilder.group({
      email: [ localStorage.getItem('email') || null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false ]      
    })
  }

  onLogin() {
    this.submitted = true;
    if(this.formLogin.valid) {
      // TODO  alerts for msg
      console.log('asda', this.formLogin.value);
      this.authService.loginUser(this.formLogin.value).subscribe((resonse) => { 
        console.log(resonse, 'tokens');
        this.rememberEmail();
      }, ({error}) => {
        // TODO  alerts for msg
        console.error(error, 'errorr', error?.msg);
        
      })
    }
    console.log('campos obligatorios'); 
  }

  rememberEmail (): void { 
    (this.formLogin.get('remember')?.value) ? 
    localStorage.setItem('email', this.formLogin.get('email')?.value) : 
    localStorage.removeItem('email');
  }

  validateForm = (): boolean => this.formLogin.invalid && this.submitted;

  signUp = () => this.router.navigateByUrl('/register');

}
