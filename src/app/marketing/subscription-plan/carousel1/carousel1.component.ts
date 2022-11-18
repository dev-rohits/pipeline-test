import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel1',
  templateUrl: './carousel1.component.html',
  styleUrls: ['./carousel1.component.scss'],
})
export class Carousel1Component implements OnInit {
  slides = [
    {
      img: '../../../../assets/images-marketing/4th.png',
      title: 'Digital Classrooms',
      description:
        'Stream your teaching LIVE without any additional cost. Live Classroom comes with Interactive Whiteboard, Polls & Surveys, Artificial Intelligence enabled smart Attendance',
      subTitle: 'NRICH Meet',
    },
    {
      img: '../../../../assets/images-marketing/5th.png',
      title: 'Enable Technology',
      description:
        'Create & distribute your course to a small group or a large audience across the world with NRICH Learning Management System. ',
      subTitle: 'NRICH LMS',
    },
    {
      img: '../../../../assets/images-marketing/6th.png',
      title: 'Analytics & KPI Dashboard',
      description:
        ' Pilot your outocmes from your Cockpit through our Dashboard. Measure & manage every detail of your class to the individual student outcomes.',
      subTitle: 'NRICH Analytics',
    },
  ];

  firstSlides = [
    '../../../assets/images-marketing/1st-Img.png',
    '../../../assets/images-marketing/2nd-Img.png',
    '../../../assets/images-marketing/3rd-Img.png',
  ];

  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,

    cssEase: 'linear',
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
