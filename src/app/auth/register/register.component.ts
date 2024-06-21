import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  formSubmited: boolean =  false;

  constructor(private router:  Router, private formBuilder: FormBuilder){
  }
  
  ngOnInit(): void {
    this.initiForm();    
  }


  private initiForm(): void{
   this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.required]
    })
  }


  onSubmit(): void {
    this.formSubmited = true;
    if( this.registerForm.valid && !this.acceptTerms()){
      console.log(this.registerForm.value, 'formulario posteado..' );
    }
  }

  validateForm = (): boolean => this.registerForm.invalid && this.formSubmited;

  // validateForm(): boolean {    
  //   if(this.registerForm.invalid && this.formSubmited) {
  //     return true;
  //   }
  //   return false
  // }

  acceptTerms = (): boolean => !this.registerForm.get('terms')?.value && this.formSubmited;

  // acceptTerms(): boolean{    
  //   return !this.registerForm.get('terms')?.value && this.formSubmited;
  // }

}
