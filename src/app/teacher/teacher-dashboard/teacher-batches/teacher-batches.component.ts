import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchList } from 'src/app/model/BatchMappingVO';
import { InstituteService } from 'src/app/services/institute/institute.service';

@Component({
  selector: 'app-teacher-batches',
  templateUrl: './teacher-batches.component.html',
  styleUrls: ['./teacher-batches.component.scss'],
})
export class TeacherBatchesComponent implements OnInit {
  today = new Date();
  batches: BatchList[] = [];
  courseId!: number;
  batchId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.queryParams?.['id'];
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
    this.instituteService.getMyBatches(this.courseId).subscribe(
      (data: BatchList[]) => {
        if (data.length <= 1) {
          this.router.navigate(['/teacher/all-info'], {
            queryParams: {
              idbatch: data?.[0].idBatch,
              courseId: data?.[0].courseId,
            },
          });
        }
        this.batches = data;
      },
      (error: any) => {}
    );
  }

  getFirstChar(str: any) {
    var numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var arr = str.split(' ');
    var newStr = '';
    for (var i = 0; i < arr.length; i++) {
      newStr += arr[i].charAt(0);
      if (numArr.includes(arr[i].charAt(1))) {
        newStr += arr[i].charAt(1);
      }
    }
    return newStr;
  }
}
