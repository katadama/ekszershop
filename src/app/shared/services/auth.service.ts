import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: Auth,private authFirebase: AngularFireAuth) { }


  login(username: string, password: string){
    return from(
      signInWithEmailAndPassword(this.auth, username, password));
  }

  isAdmin(): Observable<boolean> {
    return this.authFirebase.user.pipe(map(user => {
      return user?.email == "manager@gmail.com";
    }));
  }

  isUser(): Observable<boolean> {
    return this.authFirebase.user.pipe(map(user => {
      return user?.email == this.auth.currentUser?.email;
    }));
  }

  signUp(name: string, email: string, password: string){
    return from(
      createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }

  logout() {
    return this.authFirebase.signOut();
  }

  isUserLoggedIn() {
    return this.authFirebase.user;
  }
}
