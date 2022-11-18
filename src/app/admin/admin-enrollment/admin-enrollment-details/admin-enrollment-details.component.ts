import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-enrollment-details',
  templateUrl: './admin-enrollment-details.component.html',
  styleUrls: ['./admin-enrollment-details.component.scss']
})
export class AdminEnrollmentDetailsComponent implements OnInit {
  courseId!: number;
  batchId!: number;
  tabName:string="classes"
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.queryParams?.['id'];
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
  }

}
