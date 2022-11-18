import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-nrich-for-school',
  templateUrl: './nrich-for-school.component.html',
  styleUrls: ['./nrich-for-school.component.scss']
})
export class NrichForSchoolComponent implements OnInit {



  @ViewChild('slickModal', { static: false })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  slides = [
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-2.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-2.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
  ];
  slideConfig = {
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    dots: false,
    arrows: false,

   

   
  };
  slickInit(_e: any) {}

  breakpoint(_e: any) {}

  afterChange(_e: any) {
    this.lazyLoading = false;
  }

  beforeChange(_e: any) {}
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }
}
