import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material';
import { DndModule } from 'ngx-drag-drop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    DndModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    AdminComponent,
    CreateProjectComponent,
    CreateCategoryComponent,
    UploadImagesComponent
  ]
})
export class AdminModule { }
