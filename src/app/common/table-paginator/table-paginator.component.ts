import { T } from '@angular/cdk/keycodes';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
})
export class TablePaginatorComponent implements OnInit, OnChanges {
  page: number = 0;
  totalPage!: number;
  @Input() size!: number;
  @Input() totalElements!: number;
  @Input() disableSize: boolean = false;
  @Input() pagenumber!: number
  @Output('pageChange') pageChange = new EventEmitter<number>();
  @Output('changeSize') changeSize = new EventEmitter<number>();

  constructor() { }

  

  ngOnChanges(changes: SimpleChanges): void {
    this.size = changes['size']?.currentValue
      ? changes['size']?.currentValue
      : this.size;
    if (changes['pagenumber']?.currentValue != undefined) {
      this.page = changes['pagenumber']?.currentValue

    }
  }

  ngOnInit(): void { }
  previous() {
    this.page = this.page - 1
    this.pageChange.emit(this.page)
  }
  next() {
    this.page = this.page + 1
    this.pageChange.emit(this.page)
  }


  onPageChange(index: number) {
    this.page = index - 1;
    this.pageChange.emit(this.page)
  }
  get getTotalPages() {
    return Math.ceil(this.totalElements / this.size);
  }

  change() {
    this.changeSize.emit(this.size);
  }
}
