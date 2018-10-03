
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavbarModule, WavesModule, ButtonsModule  } from 'angular-bootstrap-md';
import { ServicesService } from './../shares/services/services.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public langs = [];
  public currentLanguage;
  public headerTitles;
  private headerTitlesAll;

constructor(private services: ServicesService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentLanguage = this.services.getLanguage();
    this.services.getHeaderTitles().subscribe(res => {
      this.headerTitlesAll = res;
      this.headerTitles = this.headerTitlesAll[this.currentLanguage.id];
    });
    this.services.getLanguages().subscribe(langs => {
      this.langs = langs;
      const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
      this.router.navigate([], { queryParams: { 'lang': this.currentLanguage.id } });
    });
  }

  changeLanguage(language) {
    this.services.changeLanguage(language);
    this.currentLanguage = language;
    this.headerTitles = this.headerTitlesAll[this.currentLanguage.id];
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    this.router.navigate([], { queryParams: { 'lang': this.currentLanguage.id } });
  }
}
