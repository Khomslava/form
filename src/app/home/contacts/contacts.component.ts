import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../../shares/services/services.service';
import { Router, ActivationEnd, NavigationStart, NavigationEnd, Event as NavigationEvent, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contact;
  contacts;
  languageId;

  constructor(private servicesService: ServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof ActivationEnd) {
        this.languageId = event['snapshot']['queryParams']['lang'];
        this.contact = this.contacts ? this.contacts[this.languageId] : '';
      }
    });
  }

  ngOnInit() {
    this.languageId = this.activatedRoute.snapshot.queryParams['lang'];
    this.servicesService.getContact().subscribe(res => {
      this.contact = res[this.languageId];
      this.contacts = res;
    });
  }

}