import { Component, OnInit } from '@angular/core';
import { BlogsVO } from 'src/app/model/BlogsVO';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {
  blogsList:BlogsVO[]=[];
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.fetchBlogs().subscribe((res:any)=>{
      this.blogsList=res;
     })
  }


}
