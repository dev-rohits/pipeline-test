import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { InnerhtmltoplaintextPipe } from './pipes/innerhtmltoplaintext.pipe';
import { LoaderComponent } from './loader/loader.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PaginationsComponent } from './paginations/paginations.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { ClassConfigurationComponent } from './class-configuration/class-configuration.component';
import { CreateEditClassConfigurationComponent } from './create-edit-class-configuration/create-edit-class-configuration.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatCommonModule,
  MatPseudoCheckbox,
  MatPseudoCheckboxModule,
} from '@angular/material/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ChatComponent } from './chat/chat.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScheduleClassListComponent } from './class-configuration/schedule-class-list/schedule-class-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoursesComponent } from './courses/courses.component';
import { CourseWizardComponent } from './course-wizard/course-wizard.component';
import { AddEditCourseComponent } from './course-wizard/add-edit-course/add-edit-course.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TablePaginatorPipe } from './pipes/table-paginator.pipe';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';
import { CoursePricingPlansComponent } from './course-wizard/course-pricing-plans/course-pricing-plans.component';
import { AddEditPricingplanComponent } from './course-wizard/course-pricing-plans/add-edit-pricingplan/add-edit-pricingplan.component';
import { ProfileComponent } from './profile/profile.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CourseBatchesComponent } from './course-wizard/course-batches/course-batches.component';
import { TagInputModule } from 'ngx-chips';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AdminListingComponent } from './user-listing/admin-listing/admin-listing.component';
import { TeacherListingComponent } from './user-listing/teacher-listing/teacher-listing.component';
import { StudentListingComponent } from './user-listing/student-listing/student-listing.component';
import { AddEditBatchesComponent } from './course-wizard/course-batches/add-edit-batches/add-edit-batches.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AddEditInstituteComponent } from './add-edit-institute/add-edit-institute.component';
import { MappingPageComponent } from './mapping-page/mapping-page.component';
import { ClassMappingPageComponent } from './class-mapping-page/class-mapping-page.component';
import { AssignmentDocumentPreviewComponent } from './assignment-document-preview/assignment-document-preview.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';
import { ConvertSizeIntoReadableFormatPipe } from './pipes/convert-size-into-readable-format.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CalculateFreeSpacePipe } from './pipes/calculate-free-space.pipe';
import { PreviewComponent } from './file-management/preview/preview.component';
import { ExamClockPipe } from './pipes/exam-clock.pipe';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { QuizSubmitByComponent } from './quiz-submit-by/quiz-submit-by.component';
import { InstituteImageCropComponent } from './institute-image-crop/institute-image-crop.component';
import { BulkUserUploadComponent } from './bulk-user-upload/bulk-user-upload.component';
import { EnrolledStudentsComponent } from './enrolled-students/enrolled-students.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { OnBoardingPageComponent } from './on-boarding-page/on-boarding-page.component';
import { ExplorePlansComponent } from './explore-plans/explore-plans.component';

@NgModule({
  declarations: [
    CommonComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoaderComponent,
    InnerhtmltoplaintextPipe,
    FilterPipe,
    PaginationsComponent,
    PaginatePipe,
    ClassConfigurationComponent,
    CreateEditClassConfigurationComponent,
    ChatComponent,
    ScheduleClassListComponent,
    BreadcrumbsComponent,
    DocumentPreviewComponent,
    CoursesComponent,
    CourseWizardComponent,
    AddEditCourseComponent,
    TablePaginatorPipe,
    TablePaginatorComponent,
    CoursePricingPlansComponent,
    AddEditPricingplanComponent,
    ProfileComponent,
    UserTransactionHistoryComponent,
    AddUserComponent,
    CourseBatchesComponent,
    UserListingComponent,
    AdminListingComponent,
    TeacherListingComponent,
    StudentListingComponent,
    AddEditBatchesComponent,
    AddTeacherComponent,
    AddEditInstituteComponent,
    MappingPageComponent,
    ClassMappingPageComponent,
    AssignmentDocumentPreviewComponent,
    FileManagementComponent,
    ImageCropDialogComponent,
    ConvertSizeIntoReadableFormatPipe,
    CalculateFreeSpacePipe,
    PreviewComponent,
    ExamClockPipe,
    QuizSubmitByComponent,
    InstituteImageCropComponent,
    BulkUserUploadComponent,
    EnrolledStudentsComponent,
    SupportPageComponent,
    OnBoardingPageComponent,
    ExplorePlansComponent,
  ],
  imports: [
    CommonModule,
    CommonRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatCommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule,
    PdfViewerModule,
    MatChipsModule,
    MatTabsModule,
    MatFormFieldModule,
    AngularEditorModule,
    MatSelectModule,
    MatInputModule,
    TagInputModule,
    ImageCropperModule,
    MatPaginatorModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    FooterComponent,
    InnerhtmltoplaintextPipe,
    ChatComponent,
    FilterPipe,
    PaginationsComponent,
    BreadcrumbsComponent,
    AddUserComponent,
    ProfileComponent,
    UserListingComponent,
    AddEditInstituteComponent,
    TablePaginatorComponent,
    FileManagementComponent,
    ExamClockPipe,
    SupportPageComponent,
    OnBoardingPageComponent,
    ExplorePlansComponent,
  ],
})
export class CommonModule2 {}
