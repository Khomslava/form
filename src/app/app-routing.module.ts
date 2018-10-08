import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {
AuthGuardService as AuthGuard
} from './shares/services/auth-guard.service';

import { MainComponent } from './home/main/main.component';
import { AboutComponent } from './home/about/about.component';
import { ServicesComponent } from './home/services/services.component';
import { CategoryComponent } from './home/category/category.component';
import { ContactsComponent } from './home/contacts/contacts.component';
import { ProjectComponent } from './home/category/project/project.component';
import { AuthComponent } from './home/auth/auth.component';


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'awards', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'architecture', component: CategoryComponent, data: { 'id': 1 }},
  { path: 'interiors', component: CategoryComponent, data: { 'id': 2 }},
  { path: 'products', component: CategoryComponent, data: { 'id': 3 }},
  { path: 'admin',
    loadChildren: './home/admin/admin.module#AdminModule'
    // canActivate: [AuthGuard]
  },
  { path: 'login', component: AuthComponent },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
   { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
