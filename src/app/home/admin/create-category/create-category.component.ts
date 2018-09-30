import { Component, OnInit } from '@angular/core';
import { Category } from './../../../shares/models/category.model';
import { ServicesService } from './../../../shares/services/services.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  langs: any;
  constructor(private services: ServicesService) { }

  ngOnInit() {
    this.services.getLanguages().subscribe(langs => {
      this.langs = langs;
    });
  }

  public createCategory() {
    console.log(this.langs);
   // this.services.createCategory(langs).subscribe( res => console.log());
  }

}
