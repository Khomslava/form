import { AuthGuardService } from './shares/services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { UploadService } from './shares/services/upload.service';
// import { AdminModule } from './home/admin/admin.module';
import { ServicesService } from './shares/services/services.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoTopButtonModule } from 'ng2-go-top-button';

// import { AgmCoreModule } from '@agm/core';


// Modules
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './home/category/category.component';
import { ServicesComponent } from './home/services/services.component';
import { AboutComponent } from './home/about/about.component';
import { ContactsComponent } from './home/contacts/contacts.component';
import { MainComponent } from './home/main/main.component';
import { ProjectComponent } from './home/category/project/project.component';
import { AwardsComponent } from './home/awards/awards.component';
import { AuthComponent } from './home/auth/auth.component';
import { ViewLoadImageComponent } from './shares/components/view-load-image/view-load-image.component';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ServicesComponent,
    AboutComponent,
    ContactsComponent,
    MainComponent,
    ProjectComponent,
    AwardsComponent,
    AuthComponent,
    ViewLoadImageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'form-bureau' }),
    BrowserAnimationsModule,
    FlexLayoutModule,
    SlideshowModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    GoTopButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    // AdminModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBZXS26Bj3-Q1xZPXUgqq5gnTMbF-iiZZk'
    // }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ServicesService, UploadService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
