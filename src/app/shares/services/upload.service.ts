import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
 import { FirebaseListObservable, FirebaseObjectObservable } from '@angular/fire/database-deprecated';
import { Upload } from '../models/upload.model';
import * as  firebase from 'firebase';
import { environment } from '../../../environments/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UploadService {

  private basePath = '/projects';
  private uploads: FirebaseListObservable<GalleryImage[]>;

  constructor(
    // private ngFire: AngularFireModule,
  //  private db: AngularFirestore,
    // private af: AngularFire,
    private afStorage: AngularFireStorage,
    private db: AngularFireDatabase
    ) { }

  uploadFile(upload: Upload, idFirebaseProduct: string, field) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`/projects_images/${idFirebaseProduct}/${field}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
      (error) => {
        console.log(error);
      },
      (): any => {

       uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
      
         upload.url = downloadURL;
         upload.name = upload.file.name;
         this.saveFileData(upload, idFirebaseProduct, field);
        });
       
      }
    );
  }

  private saveFileData(upload: Upload, idFirebaseProduct: string, field: string) {
    this.db.list(`projects/${idFirebaseProduct}/${field}/`).push(upload);
    console.log('File saved!: ' + upload.url);
  }
}