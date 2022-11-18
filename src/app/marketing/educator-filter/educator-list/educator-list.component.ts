import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeachersList } from 'src/app/model/feature-home-teacher.model';


@Component({
  selector: 'app-educator-list',
  templateUrl: './educator-list.component.html',
  styleUrls: ['./educator-list.component.scss'],
})
export class EducatorListComponent implements OnInit {
  @Input('teachersList') teachersList: TeachersList[] = [];
  @Input('config') config!: number;
  @Input('maxPages') maxPages!: number;
  @Input('pagenumber') pageNumber!:number;
  @Output() nextPage = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

}
