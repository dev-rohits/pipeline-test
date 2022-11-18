import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Body } from 'src/app/model/assignment';
import { ClassVO } from 'src/app/model/classVO';
import { FutureClass, LiveClass, MaterialFetch, PastClass } from 'src/app/model/enroll-classes';
import { NotMappedClass } from 'src/app/model/fetchteacher.model';
import { ClassService } from 'src/app/services/Classes/class.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-all-material',
  templateUrl: './all-material.component.html',
  styleUrls: ['./all-material.component.scss']
})
export class AllMaterialComponent implements OnInit {
  courseId!: number;
  batchId!: number;
  page: number = 0;
  size: number = 10;
  searchParam: string = '';
  liveClassesVO!: ClassVO[];
  futureClassesVO!: ClassVO[];

  constructor(private route: ActivatedRoute,
    private classService: ClassService) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.queryParams?.['id'];
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
  
  }
 

}
