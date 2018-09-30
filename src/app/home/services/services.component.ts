import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../../shares/services/services.service';
import { Router, ActivationEnd, NavigationStart, NavigationEnd, Event as NavigationEvent, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  languageId;
  service;
  services;

  constructor(private servicesService: ServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof ActivationEnd) {
        this.languageId = event['snapshot']['queryParams']['lang'];
        this.service = this.services ? this.services[this.languageId] : '';
      }
    });
  }

  ngOnInit() {
    this.languageId = this.activatedRoute.snapshot.queryParams['lang'];
    this.servicesService.getAbout().subscribe(res => {
      this.service = res[this.languageId];
      this.services = res;
    });
  }
}