import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';

@Component({
  selector: 'app-course-slider',
  templateUrl: './course-slider.component.html',
  styleUrls: ['./course-slider.component.scss'],
})
export class CourseSliderComponent implements OnInit {
  @Input('courses') courses!: MobileCourseVO[];

  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  slideConfig = {
    slidesToShow: 3,
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
          slidesToShow: 2,
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
