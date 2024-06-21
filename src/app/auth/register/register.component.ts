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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.required]
    }, {
      validators: this.passwordEquals('password', 'confirmPassword')
    })
  }

  onSubmit(): void {
    this.formSubmited = true;    
      if( this.registerForm.valid && !this.acceptTerms()){
        console.log(this.registerForm.value, 'formulario posteado..' );
        // this.registerForm.reset()
      }    
  }


  // onSubmit(): void {
  //   this.formSubmited = true;
  //   if(this.validatePassword()) {
  //     if( this.registerForm.valid && !this.acceptTerms()){
  //       console.log(this.registerForm.value, 'formulario posteado..' );
  //       this.registerForm.reset()
  //     }
  //   }
  // }

  validatePassword(): boolean { 
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return (password !== confirmPassword && this.formSubmited) ? true : false;
  }

  validateForm = (): boolean => this.registerForm.invalid && this.formSubmited;

  acceptTerms = (): boolean => !this.registerForm.get('terms')?.value && this.formSubmited;

  passwordEquals(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
      if(passwordControl?.value ===  confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors(null);
      } else { 
        confirmPasswordControl?.setErrors({ notEquals: true });
      }
    }
  }
}
