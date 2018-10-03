// import { SeoService } from './../../../shares/services/seo.service';
import { ServicesService } from './../../../shares/services/services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivationEnd, Params, Data, NavigationStart, NavigationEnd,
            Event as NavigationEvent, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, startWith } from 'rxjs/operators';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';

const PROJECT_KEY = makeStateKey<any>('project');

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  project;
  languageId;
  projectTranslate;
  project$: Observable<any>;

  constructor(
    // private afs: AngularFirestore,
    // private seo: SeoService,
    // private state: TransferState,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private servicesService: ServicesService) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof ActivationEnd) {
        this.languageId = event['snapshot']['queryParams']['lang'];
       }
    });
    }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // this.project$ = this.ssrFirestoreDoc(`project/${id}`);
    this.languageId = this.activatedRoute.snapshot.queryParams['lang'];
    this.servicesService.getProject(id).subscribe(res => { this.project = res; });
    this.servicesService.getProjectTranslate().subscribe(res => { this.projectTranslate = res; });
    // this.project$ = this.afs.doc<any>(path)
    //   .valueChanges()
    //   .pipe(
    //   tap(animal => {
    //     this.seo.generateTags({
    //       title: animal.name,
    //       description: animal.bio,
    //       image: animal.imgURL
    //     });
    //   })
    //   )
  }

  // ssrFirestoreDoc(path: string) {
  //   const exists = this.state.get(PROJECT_KEY, {} as any);
  //   return this.afs.doc<any>(path).valueChanges().pipe(
  //     tap(project => {
  //       this.state.set(PROJECT_KEY, project);
  //       this.seo.generateTags({
  //         title: project.name,
  //         description: project.description,
  //         image: project.photo
  //       });
  //     }),
  //     startWith(exists)
  //   );
  // }


}
