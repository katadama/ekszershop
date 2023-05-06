import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../../shared/services/user/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',
    [Validators.required, Validators.email]),
    password: new FormControl('',
    [Validators.required])
  })
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private auth: AngularFireAuth,
    private userService: UserService,
    private afs: AngularFirestore) { }


    get email(){
      return this.loginForm.get('email');
    }
    get password(){
      return this.loginForm.get('password');
    }
  
    submit() {
      if (!this.loginForm.valid) {
        return;
      }
  
      const { email, password } = this.loginForm.value;
  
  
      //Login
      this.authService.login(email as string, password as string)
        .pipe(
          this.toast.observe({
            success: 'Logged in successfully',
            loading: 'Logging in...',
            error: `There was an error `
          })
        ).subscribe(() => {
          this.auth.user.subscribe(async user => {
            
            this.router.navigate(['/jewelry-list']);
          });
        });
    }
}
