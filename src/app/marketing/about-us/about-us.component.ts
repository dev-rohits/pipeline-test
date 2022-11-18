import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;

 
  constructor(  ) {}

  ngOnInit(): void {
    // this.bucketName=AuthService.getBucketName
    

  }

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

  

  beforeChange(_e: any) {}
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }

 
}

