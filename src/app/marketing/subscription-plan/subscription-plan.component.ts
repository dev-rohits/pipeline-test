import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { LoaderService } from 'src/app/loader.service';
import { addOnPlan } from 'src/app/model/add-0nn.model';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { Auth } from 'src/app/model/Auth';
import { FAQ } from 'src/app/model/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
})
export class SubscriptionPlanComponent implements OnInit, OnDestroy {
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;
  isLogin: boolean = false

  monthlyplans: any[] = [];
  Annualplans: any[] = [];
  Faqlist!: FAQ[];
  addOns: addOnPlan[] = [];
  private planId!: number;
  bucketName!: string;
  constructor(
    public dialog: MatDialog,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router,) { }
  ngOnDestroy(): void {

  }

  handlePlanScroll() {
    const position = localStorage.getItem('scrollPosition')
    if (position) {
      window.scrollTo(0, +position)
      localStorage.removeItem('scrollPosition')
    }
  }


  ngOnInit(): void {
    // this.bucketName=AuthService.getBucketName
    this.isLogin = this.authService.isLoggin()
    this.handlePlanScroll()
    const body = document.getElementsByTagName('body')[0];
    body.style.removeProperty('background-image');
    this.subscriptionService.getSubscriptionplan().subscribe((data: any) => {
      this.Annualplans = data.teacherPricingPlans;
    });
    this.subscriptionService.getSubscriptionfaq().subscribe((data: any) => {
      this.Faqlist = data.FAQ;
    });
    // this.subscriptionService.getAddons().subscribe((data: addOnPlan[]) => {
    //   this.addOns = data;
    // });
  }

  firstSlides = [
    '../../../assets/images-marketing/img-07.png',
    '../../../assets/images-marketing/1st-Img.png',
    '../../../assets/images-marketing/2nd-Img.png',
    '../../../assets/images-marketing/3rd-Img.png',
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
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }

  purchase(id: number, price: number, type: string) {
    if (!this.authService.isLoggin()) {
      localStorage.setItem('redirectRoute', this.router.url)
      localStorage.setItem('scrollPosition', document.documentElement.scrollTop.toString())
      this.router.navigate(['/auth/login'])
      return;
    }
    if (type == 'pricingplan') {
      this.router.navigate(['/marketing/checkout'], {
        queryParams: { id: id, price: price, type: type },
      });
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
