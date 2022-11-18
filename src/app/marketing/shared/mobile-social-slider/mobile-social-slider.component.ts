import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-mobile-social-slider',
  templateUrl: './mobile-social-slider.component.html',
  styleUrls: ['./mobile-social-slider.component.scss']
})
export class MobileSocialSliderComponent implements OnInit {

  @ViewChild('slickModal', { static: false })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  slides = [
    {
      img: '../../../../assets/images-marketing/s-1.svg',
      title: 'Build your Net Worth',
      description:
        'Use your Social Connect Profile to connect to Peers, Academicians and Students from around the world. Build your network to collaborate and solve student’s doubts. Offer your expertise for projects and mentoring student community across world.',
      subTitle: 'NRICH Meet',
    },
     {
      img: '../../../../assets/images-marketing/mobile-1.svg',
      title: 'News Feed',
      description:
     ' Stay on top of who is trending and what are the topics the community is discussing about. Connect with your peers to share and sharpen your knowledge. Every time you answer questions or solve the user problems you will get star ratings. The more the ratings, the more your ranking increase and the easier you become a leader.',
      subTitle: 'SOCIAL CONNECT',
    },
  
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
