import { Project, Photo } from './../models/project.model';
import { Category } from './../models/category.model';
import { Languages } from './../models/languages.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const url = 'https://form-3b71d.firebaseio.com/';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  currentLanguage;
  languages;
  headerTitles;
  projectTranslate;
  categories;
  projects = new BehaviorSubject<any>('');
  contacts = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) { }

  public getLanguages(): Observable<Languages[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/languages.json`, { observe: 'response' })
      .map(res => {
        const langs = [];
        for (let key in res.body) {
          langs.push(new Languages(res.body[key].id, res.body[key].name));
        }
        return langs;
      });
  }

  public getLanguage() {
    const usedLang = JSON.parse(localStorage.getItem('lang'));
    return usedLang ? usedLang : new Languages(0, 'Eng');
  }

  public changeLanguage(lang) {
    localStorage.setItem('lang', JSON.stringify(lang));
    this.currentLanguage = lang;
  }

  public getHeaderTitles() {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/headerTitles.json`, { observe: 'response' })
      .map(res => {
        this.headerTitles = res.body;
        return res.body;
      });
  }

  public getAbout() {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/about.json`, { observe: 'response' })
      .map(res => {
        return res.body;
      });
  }

  public getAwards() {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/awards.json`, { observe: 'response' })
      .map(res => {
        return res.body;
      });
  }

  public getProjectTranslate() {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/projectTranslate.json`, { observe: 'response' })
      .map(res => {
        this.projectTranslate = res.body;
        return res.body;
      });
  }

  public getAllCategories(): Observable<any[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/categories.json`, { observe: 'response' })
      .map(res => {
        const categories = [];
        for (let key in res.body) {
          for (let catKey in res.body[key]) {
            let cat = res.body[key][catKey];
            categories.push(new Category(cat.id, cat.idCat, cat.languageId, cat.name));
          }
        }
        this.categories = categories;
        return categories;
      });
  }

  public createProject(data) {
    return this.http.post(`${environment.firebaseConfig.databaseURL}/projects.json`, data, { observe: 'response' });
  }

  public getProjects(filterParams) {
    if (this.projects.value) {
      if (filterParams.catId) {
        return this.projects.map(projectBeh =>
          projectBeh.filter(item => item.categoryId.some(catId => +catId === +filterParams.catId))
        );
      }
      if (filterParams.mainPage) {
        return this.projects.map(projectBeh => projectBeh.filter(item => item.showInMainPages));
      }
    } else {
      return this.http.get(`${environment.firebaseConfig.databaseURL}/projects.json`, { observe: 'response' })
        .map(res => {
          const projects = [];
          for (let key in res.body) {
            let pro = res.body[key];

            let photos = [];
            const photosLarge = [];
            const photosMobile = [];
            for (let photoLargKey in pro.photosLarge) {
              photos.push(new Photo(photoLargKey, pro.photosLarge[photoLargKey].url, pro.photosLarge[photoLargKey].order, pro.photosLarge[photoLargKey].showOnMainPage));
            }

            projects.push(new Project(key,
              pro.translate,
              pro.order,
              pro.categoryId,
              pro.year,
              pro.square,
              photosLarge,
              photosMobile,
              photos,
              pro.awardLinks,
              pro.showInMainPages));
          }

          this.projects.next(projects);

          if (filterParams.catId) {
            return projects.filter(item => item.categoryId.some(catId => +catId === +filterParams.catId));
          }

          if (filterParams.mainPage) {
            return projects.filter(item => item.showInMainPages);
          }
        });
    }
  }

  public getProject(idProject: string) {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/projects/${idProject}.json`, { observe: 'response' })
      .map(res => {
        let project;
        const pro = res.body;
        const photos = [];
        const photosLarge = [];
        const photosMobile = [];
        for (let photoLargKey in pro['photosLarge']) {
          photos.push(new Photo(photoLargKey, pro['photosLarge'][photoLargKey].url, pro['photosLarge'][photoLargKey].order, pro['photosLarge'][photoLargKey].showOnMainPage));
        }

        project = new Project(idProject,
          pro['translate'],
          pro['order'],
          pro['categoryId'],
          pro['year'],
          pro['square'],
          photosLarge,
          photosMobile,
          photos,
          pro['awardLinks'],
          pro['showInMainPages']);

        return project;
      });
  }

  public getContact(): Observable<any> {
    if (this.contacts.value) {
      return this.contacts;
    } else {
      return this.http.get(`${environment.firebaseConfig.databaseURL}/contacts.json`, { observe: 'response' })
        .map(res => {
          this.contacts.next(res.body);
          return res.body;
        }
        );
    }
  }

}
