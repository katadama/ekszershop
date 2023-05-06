import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ekszershop';
  loggedInUser?: firebase.default.User | null;
  category ='';

  constructor( private authService: AuthService,private router: Router,private toast: HotToastService ) {
    // parameter adattagok
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      this.getUserName();
    });
    
  }
  setCategory(category: string) {
    this.router.navigate(['/jewelry-list', category]);
  }
  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
  close(sidenav: MatSidenav) {
    
    sidenav.close();
    
  }
  getUserName()
  {
    return this.loggedInUser?.email?.split('@')[0];
  }
  isAdmin()
  {
    
    return this.loggedInUser?.email=="manager@gmail.com";
    
  }
  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully.');
      this.router.navigate(['/jewelry-list']);
    }).catch(error => {
      console.error(error);
    });
  }
  cart() {
    this.toast.error('Nincs kart :/');
  }
}




