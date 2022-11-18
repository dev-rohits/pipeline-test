import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { DemoClass } from 'src/app/model/DemoClass';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/Classes/class.service';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-webinar-slider',
  templateUrl: './webinar-slider.component.html',
  styleUrls: ['./webinar-slider.component.scss'],
})
export class WebinarSliderComponent implements OnInit {
  @Input('webinar') demoClasses: DemoClass[] = [];
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  currentDate: Date = new Date();
  lazyLoading: boolean = true;
  flipCard: boolean = false;
  isLogin: boolean = false;
  submitted: boolean = false;
  classId!: number;
  constructor(
    private authService: AuthService,
    private classService: ClassService,

  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggin();
  }

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

  slickInit(_e: any) { }

  breakpoint(_e: any) { }

  afterChange(_e: any) {
    this.lazyLoading = false;
  }

  beforeChange(_e: any) { }
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }

  redirectToZoom(classScheduleId: number) {
    this.classService.redirectToZoom(classScheduleId)
  }

  joinWebinar(demo: any) {
    const startDate = (moment(demo.startDate).utc().format('YYYY-MM-DD hh:mm'));
    const currentDate = (moment(this.currentDate).format('YYYY-MM-DD hh:mm'))
    if (startDate > currentDate) {
      Swal.fire("THE WEBINAR IS NOT STARTED YET");
      return;
    }
    this.redirectToZoom(demo.idClassSchedule);
    return;
  }
}
