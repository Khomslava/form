import { ServicesService } from './../../shares/services/services.service';
// import { SeoService } from './../../shares/services/seo.service';
import { Component, OnInit } from '@angular/core';
import {
  Router, ActivationEnd, Params, Data, NavigationStart, NavigationEnd,
  Event as NavigationEvent, ActivatedRoute
} from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  projects = [];
  languageId;

  // newProject: { name?: string, description?: string } = {};

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
   // private afs: AngularFirestore,
  //  private seo: SeoService,
    private servicesService: ServicesService) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof ActivationEnd) {
        this.languageId = event['snapshot']['queryParams']['lang'];
      }
    });
  }

  ngOnInit() {
    const catId = +this.activatedRoute.snapshot.data['id'];
    this.languageId = this.activatedRoute.snapshot.queryParams['lang'];
    console.log(catId);
    this.servicesService.getProjects({ 'catId': catId }).subscribe(res => { this.projects = res; console.log(res); });
  }

  public goToProject(project: any) {
    this.router.navigate(['/project', project.id], { queryParams: { lang: this.languageId } });
  }

  // async create() {
  //   const path = `projects/${this.newProject.name.toLowerCase()}`;
  //   await this.afs.doc(path).set(this.newProject);
  //   this.router.navigate([path]);
  // }

}