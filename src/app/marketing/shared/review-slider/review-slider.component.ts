import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { CourseReviewsAndRatingsVO } from 'src/app/model/CourseReviewsAndRatingsVO';

@Component({
  selector: 'app-review-slider',
  templateUrl: './review-slider.component.html',
  styleUrls: ['./review-slider.component.scss'],
})
export class ReviewSliderComponent implements OnInit {
  @Input('reviewAndRatings') reviewAndRatings: CourseReviewsAndRatingsVO[] = [];
  @Input('reviewFrom') reviewFrom: string = '';

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
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    vertical: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
