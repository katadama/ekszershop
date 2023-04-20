import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { JewelryListComponent } from './components/jewelry-list/jewelry-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'jewelry-list', component: JewelryListComponent},
  {
    path: '**',
    redirectTo: '/main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
