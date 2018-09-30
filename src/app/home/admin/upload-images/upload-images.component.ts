import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  filesBig: File[] = [];
  newFilesBig: any[];
  indexCurrentElementBig;
  imagesSrcBig = [];
  filesMob: File[] = [];
  newFilesMob: any[];
  indexCurrentElementMob;
  imagesSrcMob = [];

  draggable = {
    data: 'myDragData',
    effectAllowed: 'all',
    disable: false,
    handle: false
  };


  @Output() uploadedBigImages = new EventEmitter<any>();
  @Output() uploadedMobImages = new EventEmitter<any>();

  constructor(

  ) { }

  ngOnInit() {
  }

  handleFilesBig(event) {
    if (this.imagesSrcBig.length <= 30) {
      this.newFilesBig = Array.from(event.target.files);
      for (let i = 0; i < this.newFilesBig.length; i++) {
        if (this.imagesSrcBig.length + i >= 30) {
          this.newFilesBig.splice(i, 1);
          i--;
        }
      }
      let tempFile = this.filesBig;
      this.filesBig = this.newFilesBig;

      for (let i = 0; i < this.filesBig.length; i++) {
        let reader = new FileReader();
        let that = this;
        reader.onload = (function (f) {
          return function (e) {
            if (that.imagesSrcBig.length < 30) {
              const reader = e.target;
              that.imagesSrcBig.push({ 'url': reader.result, 'index': i });
              if (that.imagesSrcBig.length === that.filesBig.length) {
                that.imagesSrcBig.sort((a, b) => a.index - b.index);
              }

            }
          };
        })();
        reader.readAsDataURL(this.filesBig[i]);
      }
      this.filesBig = this.newFilesBig.concat(tempFile);
      this.checkMainImageBig();
      this.uploadedBigImages.emit(this.filesBig);
    }
  }

  removeImageBig(index: number) {
    this.imagesSrcBig.splice(index, 1);
    this.filesBig.splice(index, 1);
    this.filesBig.slice(this.filesBig.length, 1);
    this.checkMainImageBig();
    this.uploadedBigImages.emit(this.filesBig);
  }

  onDropBig(event: DndDropEvent, list: any) {
    if (event.index !== this.indexCurrentElementBig) {
      if (event.index < this.indexCurrentElementBig) {
        list.splice(event.index, 0, list[this.indexCurrentElementBig]);
        list.splice(this.indexCurrentElementBig + 1, 1);
        this.filesBig.splice(event.index, 0, this.filesBig[this.indexCurrentElementBig]);
        this.filesBig.splice(this.indexCurrentElementBig + 1, 1);
      } else {
        list.splice(event.index, 0, list[this.indexCurrentElementBig]);
        list.splice(this.indexCurrentElementBig, 1);
        this.filesBig.splice(event.index, 0, this.filesBig[this.indexCurrentElementBig]);
        this.filesBig.splice(this.indexCurrentElementBig, 1);
      }
      this.checkMainImageBig();
      this.uploadedBigImages.emit(this.filesBig);
    }
  }

  checkMainImageBig() {
    const checkedMainImageIndex = this.filesBig.findIndex(item => item['showOnMainPage'] === true);
    this.filesBig.forEach((item, i) => {
      if (checkedMainImageIndex !== i) {
        item['showOnMainPage'] = false;
      }
    });
    if (checkedMainImageIndex === -1) {
      this.filesBig[0]['showOnMainPage'] = true;
    }
  }

  onDragStartBig(index) {
    this.indexCurrentElementBig = index;
  }

  showMainImageBig(checkedImage) {
    if (checkedImage) {
      this.filesBig.forEach(item => item['showOnMainPage'] = false);
      this.filesBig[checkedImage]['showOnMainPage'] = true;
      this.uploadedBigImages.emit(this.filesBig);
    }
  }

  handleFilesMob(event) {
    if (this.imagesSrcMob.length <= 30) {
      this.newFilesMob = Array.from(event.target.files);
      for (let i = 0; i < this.newFilesMob.length; i++) {
        if (this.imagesSrcMob.length + i >= 30) {
          this.newFilesMob.splice(i, 1);
          i--;
        }
      }
      let tempFile = this.filesMob;
      this.filesMob = this.newFilesMob;

      for (let i = 0; i < this.filesMob.length; i++) {
        let reader = new FileReader();
        let that = this;
        reader.onload = (function (f) {
          return function (e) {
            if (that.imagesSrcMob.length < 30) {
              const reader = e.target;
              that.imagesSrcMob.push({ 'url': reader.result, 'index': i });
              if (that.imagesSrcMob.length === that.filesMob.length) {
                that.imagesSrcMob.sort((a, b) => a.index - b.index);
              }

            }
          };
        })();
        reader.readAsDataURL(this.filesMob[i]);
      }
      this.filesMob = this.newFilesMob.concat(tempFile);
      this.checkMainImageMob();
      this.uploadedMobImages.emit(this.filesMob);
    }
  }

  removeImageMob(index: number) {
    this.imagesSrcMob.splice(index, 1);
    this.filesMob.splice(index, 1);
    this.filesMob.slice(this.filesMob.length, 1);
    this.checkMainImageMob();
    this.uploadedMobImages.emit(this.filesMob);
  }

  onDropMob(event: DndDropEvent, list: any) {
    if (event.index !== this.indexCurrentElementMob) {
      if (event.index < this.indexCurrentElementMob) {
        list.splice(event.index, 0, list[this.indexCurrentElementMob]);
        list.splice(this.indexCurrentElementMob + 1, 1);
        this.filesBig.splice(event.index, 0, this.filesMob[this.indexCurrentElementMob]);
        this.filesBig.splice(this.indexCurrentElementMob + 1, 1);
      } else {
        list.splice(event.index, 0, list[this.indexCurrentElementMob]);
        list.splice(this.indexCurrentElementMob, 1);
        this.filesMob.splice(event.index, 0, this.filesMob[this.indexCurrentElementMob]);
        this.filesMob.splice(this.indexCurrentElementMob, 1);
      }
      this.checkMainImageMob();
      this.uploadedMobImages.emit(this.filesMob);
    }
  }

  checkMainImageMob() {
    const checkedMainImageIndex = this.filesMob.findIndex(item => item['showOnMainPage'] === true);
    this.filesMob.forEach((item, i) => {
      if (checkedMainImageIndex !== i) {
        item['showOnMainPage'] = false;
      }
    });
    if (checkedMainImageIndex === -1) {
      this.filesMob[0]['showOnMainPage'] = true;
    }
  }

  onDragStartMob(index) {
    this.indexCurrentElementMob = index;
  }

  showMainImageMob(checkedImage) {
    if (checkedImage) {
      this.filesMob.forEach(item => item['showOnMainPage'] = false);
      this.filesMob[checkedImage]['showOnMainPage'] = true;
      this.uploadedMobImages.emit(this.filesMob);
    }
  }



}