import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PaginationsComponent implements OnInit, OnChanges {
  @Input('totalItems') totalItems!: number;
  @Input('pageSize') pageSize!: number;
  @Input('maxPages') maxPages!: number;
  currentPage: number = 0;
  @Output() nextPage = new EventEmitter<number>();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  nextPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.nextPage.emit(pageNumber);
  }
}
