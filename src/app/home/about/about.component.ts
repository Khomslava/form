import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../../shares/services/services.service';
import { Router, ActivationEnd, NavigationStart, NavigationEnd, Event as NavigationEvent, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  languageId;
  abouts;
  about;
  awards;

  constructor(private servicesService: ServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof ActivationEnd) {
        this.languageId = event['snapshot']['queryParams']['lang'];
        this.about = this.abouts ? this.abouts[this.languageId] : '';
      }
    });
  }

  ngOnInit() {
    this.languageId = this.activatedRoute.snapshot.queryParams['lang'];
    this.servicesService.getAbout().subscribe(res => {
      this.about = res[this.languageId];
      this.abouts = res;
    });
    this.servicesService.getAwards().subscribe(res => {
      console.log(res);
      this.awards = res;
     // this.about = res[this.languageId];
     // this.abouts = res;
    });
  }

  public goToProject(project: any) {
    this.router.navigate(['/project', project.id], { queryParams: { lang: this.languageId } });
  }

}
