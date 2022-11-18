import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ExpertVO } from 'src/app/model/ExpertVO';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;
  expertsList: ExpertVO[] = [];
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.fetchExperts().subscribe((res: any) => {
      this.expertsList = res.body;
      this.expertsList.slice(0,1)
    });
  }

  slides = [
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-2.png' },
    { img: '../assets/img/v-1.png' },
    { img: '../assets/img/v-1.png' },
   
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,

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

  // addSlide() {
  //   this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  // }

  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }

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
