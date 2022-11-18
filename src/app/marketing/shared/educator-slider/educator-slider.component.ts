import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { TeachersList } from 'src/app/model/feature-home-teacher.model';

@Component({
  selector: 'app-educator-slider',
  templateUrl: './educator-slider.component.html',
  styleUrls: ['./educator-slider.component.scss'],
})
export class EducatorSliderComponent implements OnInit {
  @Input('teacherList') teacherList!: TeachersList[];

  @ViewChild('slickModal', { static: false })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    arrows: false,

    speed: 1000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
