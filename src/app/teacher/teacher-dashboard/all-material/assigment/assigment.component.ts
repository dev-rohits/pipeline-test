import { A } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assignmentVO } from 'src/app/model/assignmentVO';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-assigment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.scss']
})
export class AssigmentComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  batchId!: number;
  totalCount!:number;
  assignments!: assignmentVO[];
  constructor(private route: ActivatedRoute,private studentService:StudentService,private router:Router) { }

  ngOnInit(): void {
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
    this.fetchAssignments(this.page);
  }
  fetchAssignments(page:number) {
    this.studentService
      .fetchAssignments(this.batchId,this.size,page)
      .subscribe((res: any) => {
        this.assignments = res?.body.assignments;
        this.totalCount=res?.body.total_count;

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


  assignmentSubmitBy(element: assignmentVO){
    this.router.navigate(['/teacher/submit-by', element.id]);
  }
}
