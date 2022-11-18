import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss'],
})
export class InstituteListComponent implements OnInit {
  @Input('instituteList') instituteList: any;
  @Input('config') config!: number;
  @Input('maxPages') maxPages!: number;
  @Output() nextPage = new EventEmitter<number>();
  @Input('pagenumber') pageNumber!:number
  constructor() {}

  ngOnInit(): void {}

  // pageChanged(event: any) {
  //   this.config.currentPage = event;
  // }
}
