import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoadImageComponent } from './view-load-image.component';

describe('ViewLoadImageComponent', () => {
  let component: ViewLoadImageComponent;
  let fixture: ComponentFixture<ViewLoadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLoadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
