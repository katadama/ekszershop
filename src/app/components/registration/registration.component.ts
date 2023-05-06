import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ValidatorFn, AbstractControl, ValidationErrors, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../shared/services/auth.service';

export function passwordMathchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if(password && confirmPassword && password !== confirmPassword){
        return {
          passwordsDontMatch: true
        }
      }

      return null;
  };
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {


  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordMathchValidator() })

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private afs: AngularFirestore
  ) {}

  get name(){
    return this.signUpForm.get('name')
  }
  get email(){
    return this.signUpForm.get('email')
  }
  get password(){
    return this.signUpForm.get('password')
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }

  clickedOnce = false;

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    let data =
    {
      'email': this.signUpForm.value.email,
      'username': this.signUpForm.value.name,
    };

    this.afs.collection('user').add(data);

    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(name as string, email as string, password as string).pipe(
      this.toast.observe({
        success: 'Regisztráció sikeres!',
        loading: 'Bejelentkezés...',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/jewelry-list']);
    })
  }
}
//Firebase: Error (auth/configuration-not-found).
