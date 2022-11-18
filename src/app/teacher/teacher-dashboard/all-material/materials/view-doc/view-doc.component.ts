import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.scss']
})
export class ViewDocComponent implements OnInit {
  isPdf = false;
  isImg = false;
  isVideo = false;
  
  filePath:string=''
 
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent!: PdfViewerComponent;
  img: any;
  constructor(private dialogRef: MatDialogRef<ViewDocComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      obj: any;
      type: string;
    },) { }

  ngOnInit(): void {
  }
  removeDialog() {
    this.dialogRef.close();
  }
}
