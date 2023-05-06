import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JewelryListComponent } from './components/jewelry-list/jewelry-list.component';
import { JewelryManagementComponent } from './components/jewelry-management/jewelry-management.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminGuard } from './shared/guard/admin.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: JewelryListComponent},
  {path: 'jewelry-list/:category', component: JewelryListComponent},
  {path: 'jewelry-list/ring', component: JewelryListComponent},
  {path: 'jewelry-manage', component: JewelryManagementComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {
    path: '**',
    redirectTo: 'jewelry-list/ring'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
