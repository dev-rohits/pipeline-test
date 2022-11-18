import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { BatchList } from 'src/app/model/BatchMappingVO';
import { InstituteService } from 'src/app/services/institute/institute.service';

@Component({
  selector: 'app-admin-batches',
  templateUrl: './admin-batches.component.html',
  styleUrls: ['./admin-batches.component.scss'],
})
export class AdminBatchesComponent implements OnInit {
  today = new Date();
  batches: BatchList[] = [];
  courseId!: number;
  batchId!: number;
  courseName!: string;
  constructor(
    private route: ActivatedRoute,
    private instituteService: InstituteService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.queryParams?.['id'];
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
    this.courseName = this.route.snapshot.queryParams?.['courseName'];
    this.loader
      .showLoader(this.instituteService.getMyBatches(this.courseId))
      .subscribe(
        (data: BatchList[]) => {
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
