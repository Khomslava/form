import { CreateCategoryComponent } from './create-category/create-category.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [

      { path: 'createproject', component: CreateProjectComponent },
      { path: 'createcategory', component: CreateCategoryComponent }
    ]},
  // { path: 'info', component: EditInfoComponent },
  // { path: 'about', component: EditAboutComponent },
  // { path: 'contacts', component: EditProjectComponent },
  // {
  //   path: '',
  //   redirectTo: '/admin/changes',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
