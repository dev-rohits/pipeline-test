import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { CommonModule2 } from '../common/common.module';
import { LiveClassComponent } from './live-class/live-class.component';
import { AllMaterialComponent } from './teacher-dashboard/all-material/all-material.component';
import { AllClassComponent } from './teacher-dashboard/all-material/all-class/all-class.component';
import { AssigmentComponent } from './teacher-dashboard/all-material/assigment/assigment.component';
import { MaterialsComponent } from './teacher-dashboard/all-material/materials/materials.component';
import { QuizComponent } from './teacher-dashboard/all-material/quiz/quiz.component';
import { ReviewComponent } from './teacher-dashboard/all-material/review/review.component';
import { SubjectComponent } from './teacher-dashboard/all-material/subject/subject.component';
import { ViewDocComponent } from './teacher-dashboard/all-material/materials/view-doc/view-doc.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignmentComponent } from './assignment/assignment.component';
import { AddAssignmentComponent } from './assignment/add-assignment/add-assignment.component';
import { MaterialListingComponent } from './material-listing/material-listing.component';
import { AddMaterialComponent } from './material-listing/add-material/add-material.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxFileDropModule } from 'ngx-file-drop';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { CourseRequestComponent } from './course-request/course-request.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizCreationComponent } from './quiz-creation/quiz-creation.component';
import { QuizQuestionComponent } from './quiz-creation/quiz-question/quiz-question.component';
import { QuizQuestionPreviewComponent } from './quiz-creation/quiz-question-preview/quiz-question-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialClassMappingComponent } from './material-listing/material-class-mapping/material-class-mapping.component';
import { AssignmentSudmitbyComponent } from './assignment/assignment-sudmitby/assignment-sudmitby.component';
import { CreateCourseRequestComponent } from './create-course-request/create-course-request.component';
import { DemoStudentRequestComponent } from './demo-student-request/demo-student-request.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TagInputModule } from 'ngx-chips';
import { ClassDetailsComponent } from './teacher-dashboard/all-material/class-details/class-details.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { EvaluateAssignmentComponent } from './assignment/assignment-sudmitby/evaluate-assignment/evaluate-assignment.component';
import { DemoClassesComponent } from '../student/student-enrollment/student-dashboard-info/demo-classes/demo-classes.component';
import { TeacherBatchesComponent } from './teacher-dashboard/teacher-batches/teacher-batches.component';
import { TeacherDemoClassesComponent } from './teacher-dashboard/all-material/teacher-demo-classes/teacher-demo-classes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuizPreviewComponent } from './quiz-creation/quiz-preview/quiz-preview.component';
import { TeacherWebinarsComponent } from './teacher-dashboard/all-material/teacher-webinars/teacher-webinars.component';

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDashboardComponent,
    LiveClassComponent,
    AllMaterialComponent,
    AllClassComponent,
    AssigmentComponent,
    MaterialsComponent,
    QuizComponent,
    ReviewComponent,
    SubjectComponent,
    ViewDocComponent,
    AssignmentComponent,
    AddAssignmentComponent,
    MaterialListingComponent,
    AddMaterialComponent,
    CourseRequestComponent,
    QuizListComponent,
    QuizQuestionComponent,
    QuizQuestionPreviewComponent,
    QuizCreationComponent,
    MaterialClassMappingComponent,
    AssignmentSudmitbyComponent,
    CreateCourseRequestComponent,
    DemoStudentRequestComponent,
    ClassDetailsComponent,
    EvaluateAssignmentComponent,
    DemoClassesComponent,
    TeacherBatchesComponent,
    TeacherDemoClassesComponent,
    QuizPreviewComponent,
    TeacherWebinarsComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    CommonModule2,
    MatTabsModule,
    PdfViewerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    AngularEditorModule,
    MatMenuModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressBarModule,
    NgxFileDropModule,
    DragDropModule,
    MatInputModule,
    MatSnackBarModule,
    TagInputModule,
    NgxDocViewerModule
  ],
})
export class TeacherModule {}