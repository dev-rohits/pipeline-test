import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';

import { BlogInfoComponent } from './blogs-list/blog-info/blog-info.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { ContactNrichComponent } from './contactNrich/contact-nrich.component';
import { CourseFilterComponent } from './course-filter/course-filter.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CategoryCoursesComponent } from './course-selection/category-courses/category-courses.component';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { SubCategoriesComponent } from './course-selection/sub-categories/sub-categories.component';
import { SubSubCategoriesComponent } from './course-selection/sub-sub-categories/sub-sub-categories.component';
import { EducatorFilterComponent } from './educator-filter/educator-filter.component';
import { HomeComponent } from './home/home.component';
import { InstituteFilterComponent } from './institute-filter/institute-filter.component';
import { InstitutePageComponent } from './institute-page/institute-page.component';
import { MarketingComponent } from './marketing.component';
import { NrichAppWebsiteComponent } from './nrich-app-website/nrich-app-website.component';
import { NrichBenifitsComponent } from './nrich-benifits/nrich-benifits.component';
import { NrichDigitalLibraryComponent } from './nrich-digital-library/nrich-digital-library.component';
import { NrichForInstituteComponent } from './nrich-for-institute/nrich-for-institute.component';
import { NrichForSchoolComponent } from './nrich-for-school/nrich-for-school.component';
import { NrichForStudentComponent } from './nrich-for-student/nrich-for-student.component';
import { NrichLegalContactComponent } from './nrich-legal-contact/nrich-legal-contact.component';
import { NrichMeetComponent } from './nrich-meet/nrich-meet.component';
import { NrichSocialConnectComponent } from './nrich-social-connect/nrich-social-connect.component';
import { CheckoutComponent } from './subscription-plan/checkout/checkout.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MarketingComponent,
    children: [
      {
        path: '',
        redirectTo: '/marketing/home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },
      { path: 'teacher-profile', component: TeacherProfileComponent },
      { path: 'institute-info', component: InstitutePageComponent },
      { path: 'course-info', component: CoursePageComponent },
      {
        path: 'categories',
        component: CourseSelectionComponent,
        children: [
          { path: 'subCategories', component: SubCategoriesComponent },
          { path: 'subSubCategories', component: SubSubCategoriesComponent },
          { path: 'categoryCourses', component: CategoryCoursesComponent },
        ],
      },
      { path: 'educator-list', component: EducatorFilterComponent },
      { path: 'institute-list', component: InstituteFilterComponent },
      { path: 'course-list', component: CourseFilterComponent },
      { path: 'blog-list', component: BlogsListComponent },
      { path: 'blog-details', component: BlogInfoComponent },
      { path: 'subscription', component: SubscriptionPlanComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactNrichComponent },
      { path: 'nrich-for-student', component: NrichForStudentComponent },
      { path: 'nrich-for-school', component: NrichForSchoolComponent },
      { path: 'nrich-for-institute', component: NrichForInstituteComponent },
      { path: 'digital-library', component: NrichDigitalLibraryComponent },
      { path: 'nrich-social-connect', component: NrichSocialConnectComponent },
      { path: 'benefits', component: NrichBenifitsComponent },
      { path: 'app-websites', component: NrichAppWebsiteComponent },
      { path: 'meet', component: NrichMeetComponent },
      { path: 'legal-contact', component: NrichLegalContactComponent },
      {path:'nrich-social-connect', component:NrichSocialConnectComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketingRoutingModule {}
