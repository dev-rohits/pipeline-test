import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { CommonModule2 } from '../common/common.module';
import { StudentDashboardInfoComponent } from './student-enrollment/student-dashboard-info/student-dashboard-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentAllClassesComponent } from './student-enrollment/student-dashboard-info/student-all-classes/student-all-classes.component';
import { StudentAllAssignmentsComponent } from './student-enrollment/student-dashboard-info/student-all-assignments/student-all-assignments.component';
import { StudentQuizComponent } from './student-enrollment/student-dashboard-info/student-quiz/student-quiz.component';
import { StudentMaterialComponent } from './student-enrollment/student-dashboard-info/student-material/student-material.component';
import { FormsModule } from '@angular/forms';
import { MaterialPreviewComponent } from './student-enrollment/student-dashboard-info/student-material/material-preview/material-preview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SubmitAssignmentComponent } from './student-enrollment/student-dashboard-info/student-all-assignments/submit-assignment/submit-assignment.component';
import { MatMenuModule } from '@angular/material/menu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InstructionsComponent } from './student-enrollment/student-dashboard-info/student-quiz/instructions/instructions.component';
import { ExamComponent } from './exam/exam.component';
import { ExamFeedbackComponent } from './exam/exam-feedback/exam-feedback.component';
import { StudentAllWebinarsComponent } from './student-enrollment/student-dashboard-info/student-all-webinars/student-all-webinars.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentEnrollmentComponent,
    StudentDashboardInfoComponent,
    StudentAllClassesComponent,
    StudentAllAssignmentsComponent,
    StudentQuizComponent,
    StudentMaterialComponent,
    MaterialPreviewComponent,
    SubmitAssignmentComponent,
    InstructionsComponent,
    ExamComponent,
    ExamFeedbackComponent,
    StudentAllWebinarsComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    CommonModule2,
    MatTabsModule,
    FormsModule,
    PdfViewerModule,
    AngularEditorModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
  ],
})
export class StudentModule {}
