import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
  @Output('scrolltocontactus')
  scrolltocontactus: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  slides = [
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-2.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
  ];
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) { }

  breakpoint(e: any) { }

  afterChange(e: any) { }

  beforeChange(e: any) { }
  scrolltop(id: any) {
    this.scrolltocontactus.emit(id);
    let el = document.getElementById(id);
    el?.scrollIntoView();
  }
}
