import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-view-load-image',
  templateUrl: './view-load-image.component.html',
  styleUrls: ['./view-load-image.component.scss']
})
export class ViewLoadImageComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver;
  inView = false;
  once50PctVisible = false;

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() options: any = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
  @Output('inView') inView$: EventEmitter<any> = new EventEmitter();
  @Output('notInView') notInView$: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
     // console.log(entries);
      if (entry.isIntersecting) {
        this.inView = true;
        this.defaultInViewHandler(entry);
        this.inView$.emit(entry);
      } else {
        this.notInView$.emit(entry);
      }
    });
  }

  defaultInViewHandler(entry) {
    if (this.once50PctVisible) {
      return false;
    }

    if (this.inView$.observers.length) {
      return false;
    }
    console.log(entry.intersectionRatio);
    if (entry.intersectionRatio < 0.8) {
    //  let opacity = entry.intersectionRatio * (1 / 0.8);
      let opacity = entry.intersectionRatio;
      let blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
    //  let filter = `blur(${blur}px)`;
      let filter = 'unset';
    //  Object.assign(entry.target.style, { opacity, filter });
      console.log(opacity);
      Object.assign(entry.target.style, { opacity, filter });
    } else {
      entry.target.style.opacity = 1;
      entry.target.style.filter = 'unset';
      this.once50PctVisible = true;
    }
  }
}

