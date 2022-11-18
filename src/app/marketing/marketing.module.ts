import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { MarketingHeaderComponent } from './shared/marketing-header/marketing-header.component';
import { MarketingFooterComponent } from './shared/marketing-footer/marketing-footer.component';
import { NavigationMenuComponent } from './shared/navigation-menu/navigation-menu.component';
import { HomeComponent } from './home/home.component';
import { InstitutePageComponent } from './institute-page/institute-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseSelectionComponent } from './course-selection/course-selection.component';

import { HomeSearchComponent } from './home/home-search/home-search.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { CourseSliderComponent } from './shared/course-slider/course-slider.component';
import { EducatorSliderComponent } from './shared/educator-slider/educator-slider.component';
import { InstituteSliderComponent } from './shared/institute-slider/institute-slider.component';
import { HomeCoursesComponent } from './home/home-courses/home-courses.component';
import { EducatorsComponent } from './home/educators/educators.component';
import { InstitutesComponent } from './home/institutes/institutes.component';
import { ExpertsComponent } from './home/experts/experts.component';
import { FaqComponent } from './shared/faq/faq.component';
import { BlogsComponent } from './shared/blogs/blogs.component';
import { TeacherRegistrationComponent } from './shared/teacher-registration/teacher-registration.component';
import { InquiryFormComponent } from './shared/inquiry-form/inquiry-form.component';
import { CourseVideoComponent } from './course-page/course-video/course-video.component';
import { PricingPlansComponent } from './course-page/pricing-plans/pricing-plans.component';
import { RelatedCoursesComponent } from './course-page/related-courses/related-courses.component';
import { BookDemoComponent } from './course-page/book-demo/book-demo.component';
import { ReviewSliderComponent } from './shared/review-slider/review-slider.component';
import { HighlightsComponent } from './shared/highlights/highlights.component';
import { AchieversSliderComponent } from './shared/achievers-slider/achievers-slider.component';
import { CourseFilterComponent } from './course-filter/course-filter.component';
import { EducatorFilterComponent } from './educator-filter/educator-filter.component';
import { InstituteFilterComponent } from './institute-filter/institute-filter.component';
import { CourseListComponent } from './course-filter/course-list/course-list.component';
import { EducatorListComponent } from './educator-filter/educator-list/educator-list.component';
import { InstituteListComponent } from './institute-filter/institute-list/institute-list.component';
import { CategoryCoursesComponent } from './course-selection/category-courses/category-courses.component';
import { SubCategoriesComponent } from './course-selection/sub-categories/sub-categories.component';
import { SubSubCategoriesComponent } from './course-selection/sub-sub-categories/sub-sub-categories.component';

import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BuyCourseComponent } from './course-page/buy-course/buy-course.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReviewsComponent } from './shared/reviews/reviews.component';
import { TeacherReviewsComponent } from './teacher-profile/teacher-reviews/teacher-reviews.component';
import { matDialogAnimations, MatDialogModule } from '@angular/material/dialog';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule2 } from '../common/common.module';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogInfoComponent } from './blogs-list/blog-info/blog-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WebinarSliderComponent } from './shared/webinar-slider/webinar-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { CheckoutComponent } from './subscription-plan/checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NrichForStudentComponent } from './nrich-for-student/nrich-for-student.component';
import { NrichForInstituteComponent } from './nrich-for-institute/nrich-for-institute.component';
import { NrichForTeacherComponent } from './nrich-for-teacher/nrich-for-teacher.component';
import { NrichForSchoolComponent } from './nrich-for-school/nrich-for-school.component';
import { NrichDigitalLibraryComponent } from './nrich-digital-library/nrich-digital-library.component';
import { NrichSocialConnectComponent } from './nrich-social-connect/nrich-social-connect.component';
import { NrichBenifitsComponent } from './nrich-benifits/nrich-benifits.component';
import { NrichAppWebsiteComponent } from './nrich-app-website/nrich-app-website.component';
import { NrichMeetComponent } from './nrich-meet/nrich-meet.component';
import { NrichLegalContactComponent } from './nrich-legal-contact/nrich-legal-contact.component';
import { ContactInformationComponent } from './subscription-plan/checkout/contact-information/contact-information.component';
import { PaymentComponent } from './subscription-plan/checkout/payment/payment.component';
import { ConfirmationComponent } from './subscription-plan/checkout/confirmation/confirmation.component';
import { BrowserModule } from '@angular/platform-browser';
import { ContactNrichComponent } from './contactNrich/contact-nrich.component';
import { StudentSearchComponent } from './nrich-for-student/student-search/student-search.component';
import { StudentContactUsComponent } from './nrich-for-student/student-contact-us/student-contact-us.component';
import { StudentStaticContentComponent } from './nrich-for-student/student-static-content/student-static-content.component';
import { SubscriptionContactUsComponent } from './subscription-plan/subscription-contact-us/subscription-contact-us.component';
import { SubscriptionPlanSearchComponent } from './subscription-plan/subscription-plan-search/subscription-plan-search.component';
import { ContactusFaqComponent } from './contactus-faq/contactus-faq.component';
import { Carousel1Component } from './subscription-plan/carousel1/carousel1.component';
import { MobileSocialSliderComponent } from './shared/mobile-social-slider/mobile-social-slider.component';

@NgModule({
  declarations: [
    MarketingComponent,
    MarketingHeaderComponent,
    MarketingFooterComponent,
    NavigationMenuComponent,
    HomeComponent,
    InstitutePageComponent,
    CoursePageComponent,
    CourseSelectionComponent,
    HomeSearchComponent,
    ContactUsComponent,
    ContactNrichComponent,
    CategoriesComponent,
    CourseSliderComponent,
    EducatorSliderComponent,
    InstituteSliderComponent,
    HomeCoursesComponent,
    EducatorsComponent,
    InstitutesComponent,
    ExpertsComponent,
    FaqComponent,
    BlogsComponent,
    TeacherRegistrationComponent,
    InquiryFormComponent,
    CourseVideoComponent,
    PricingPlansComponent,
    RelatedCoursesComponent,
    BookDemoComponent,
    ReviewSliderComponent,
    HighlightsComponent,
    AchieversSliderComponent,
    CourseFilterComponent,
    EducatorFilterComponent,
    InstituteFilterComponent,
    CourseListComponent,
    EducatorListComponent,
    InstituteListComponent,
    CategoryCoursesComponent,
    SubCategoriesComponent,
    SubSubCategoriesComponent,
    TeacherProfileComponent,
    ReviewsComponent,
    TeacherReviewsComponent,
    BuyCourseComponent,
    ReviewsComponent,
    BlogsListComponent,
    BlogInfoComponent,
    WebinarSliderComponent,
    SubscriptionPlanComponent,
    CheckoutComponent,
    AboutUsComponent,
    NrichForStudentComponent,
    NrichForInstituteComponent,
    NrichForTeacherComponent,
    NrichForSchoolComponent,
    NrichDigitalLibraryComponent,
    NrichSocialConnectComponent,
    NrichBenifitsComponent,
    NrichAppWebsiteComponent,
    NrichMeetComponent,
    NrichLegalContactComponent,
    ContactInformationComponent,
    PaymentComponent,
    ConfirmationComponent,
    StudentSearchComponent,
    StudentContactUsComponent,
    StudentStaticContentComponent,
    SubscriptionContactUsComponent,
    SubscriptionPlanSearchComponent,
    ContactusFaqComponent,
    Carousel1Component,
    MobileSocialSliderComponent,
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    NgxStarRatingModule,
    MatPaginatorModule,
    CommonModule2,
    NgxPaginationModule,
    MatAutocompleteModule
  ],
})
export class MarketingModule {}
