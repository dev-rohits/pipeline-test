import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assignmentVO } from 'src/app/model/assignmentVO';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-admin-all-assignments',
  templateUrl: './admin-all-assignments.component.html',
  styleUrls: ['./admin-all-assignments.component.scss']
})
export class AdminAllAssignmentsComponent implements OnInit {

  page: number = 0;
  size: number = 5;
  batchId!: number;
  totalCount!: number;
  assignments!: assignmentVO[];
  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.batchId = +this.route.snapshot.queryParams?.['batchId'];
    this.fetchAssignments(this.page);
  }
  fetchAssignments(page:number) {
    this.studentService
      .fetchAssignments(this.batchId, this.size, page)
      .subscribe((res: any) => {
        this.assignments = res?.body.assignments;
        this.totalCount = res?.body.total_count;

      });
  }
  pageChange(page: number) {
    this.page = page
    this.fetchAssignments(this.page)
  }

  changeSize(size: number) {
    this.size = size
    this.fetchAssignments(0)
  }

  assignmentSubmitBy(element: assignmentVO) {
    this.router.navigate(['/teacher/submit-by', element.id]);
  }

}
