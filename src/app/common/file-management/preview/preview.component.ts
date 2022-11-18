import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  path: string = '';
  type: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { path: string; type: string }
  ) {}

  ngOnInit(): void {
    this.path = this.data.path;
    this.type = this.data.type;
  }
}
