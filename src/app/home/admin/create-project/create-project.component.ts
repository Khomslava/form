
import { ServicesService } from './../../../shares/services/services.service';
import { Component, OnInit } from '@angular/core';
import { Project, TranslateProject } from './../../../shares/models/project.model';
import { FormControl } from '@angular/forms';
import { UploadService } from './../../../shares/services/upload.service';
import { Upload } from './../../../shares/models/upload.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  public categories = [];
  public project: Project;
  public langs = [];
  upload: Upload;
  result: any;
  errorMessage: any;
  bigImages;
  mobImages;

  constructor(private services: ServicesService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.project = new Project('', [], null, [], null, null, [], [], [], [], false);
    this.services.getLanguages().subscribe(langs => {
      this.langs = langs;
      langs.forEach(lang => this.project.translate.push(new TranslateProject('', '', '', '', '', '')));
    });
    this.services.getAllCategories().subscribe(res => this.categories = res.filter(item => item.languageId === 2));
  }

  createProject() {
    console.log(this.project);
    this.services.createProject(this.project)
      .subscribe(
      result => {
        console.log(result.body);
        const idFirebaseProduct = result.body['name'];
        if (this.bigImages) {
          const imageToUploadBig = this.bigImages;
          const imagesBigIdx = _.range(imageToUploadBig.length);
          _.each(imagesBigIdx, (idx) => {
            this.upload = new Upload(imageToUploadBig[idx]);
            this.upload['order'] = idx;
            console.log(this.bigImages[idx]);
            this.upload['showOnMainPage'] = this.bigImages[idx]['showOnMainPage'];
            this.uploadService.uploadFile(this.upload, idFirebaseProduct, 'photosLarge');
          });
        }
        if (this.mobImages) {
          const imageToUploadMob = this.mobImages;
          const imagesMobIdx = _.range(imageToUploadMob.length);
          _.each(imagesMobIdx, (idx) => {
            this.upload = new Upload(imageToUploadMob[idx]);
            this.upload['order'] = idx;
            this.upload['showOnMainPage'] = this.bigImages[idx]['showOnMainPage'];
            this.uploadService.uploadFile(this.upload, idFirebaseProduct, 'photosMobile');
          });
        }
      },
      error => this.errorMessage = error
      );
  }

  uploadedBigImages(images) {
    console.log(images);
    this.bigImages = images;
  }

  uploadedMobImages(images) {
    console.log('ds');
    this.mobImages = images;
  }

}
