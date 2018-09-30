import { Component, OnInit } from '@angular/core';
import { Router,  Params, Data, ActivatedRoute} from '@angular/router';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { ServicesService } from './../../shares/services/services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  languageId;
  projects = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.languageId = this.activatedRoute.snapshot.queryParams['lang'];
    this.servicesService.getProjects({'mainPage': true}).subscribe(res => { this.projects  = res; });
  }

  public goToProject(project: any) {
    this.router.navigate(['/project', project.id], { queryParams: { lang: this.languageId } });
  }

}