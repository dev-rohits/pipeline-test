import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseVO } from 'src/app/model/CourseVO';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.scss']
})
export class CourseVideoComponent implements OnInit {
  @Input("courseDetails") courseDetails?: CourseVO;
  @Output() newItemEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
 

  addNewItem() {
    this.newItemEvent.emit();
  }
}
