import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Input('courseList') courseList: MobileCourseVO[] = [];
  @Input('config') config!: number;
  @Input('maxPages') maxPages!: number;
  @Input('pagenumber') pageNumber!:number
  @Output() nextPage = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
