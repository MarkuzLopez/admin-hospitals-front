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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false ]      
    })
  }

  onLogin() {
    this.submitted = true;
    if(this.formLogin.valid) {
      console.log('asda', this.formLogin.value);
      this.authService.loginUser(this.formLogin.value).subscribe((resonse) => { 
        console.log(resonse, 'tokens');
        
      }, ({error}) => {
        console.error(error, 'errorr', error?.msg);
        
      })
    }
    console.log('campos obligatorios'); 
  }

  validateForm = (): boolean => this.formLogin.invalid && this.submitted;

  // validFields (): boolean{ 
  //   if( this.formLogin.invalid && this.submitted) {
  //     return true
  //   }
  //   return false
  // }
  

  signUp(): void {
    this.router.navigateByUrl('/register');
  }

}
