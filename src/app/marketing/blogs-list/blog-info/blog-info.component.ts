import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogsVO } from 'src/app/model/BlogsVO';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.scss']
})
export class BlogInfoComponent implements OnInit {
  Id: any;
  blogDetails!: BlogsVO;
  blogsList:BlogsVO[]=[];
  constructor(private commonService:CommonService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.Id = params['id'];
      this.commonService.fetchBlogDetails(this.Id).subscribe((res:any)=>{
        this.blogDetails=res.body;
            })
   });

    this.commonService.fetchBlogs().subscribe((res:any)=>{
      this.blogsList=res;
     })
  }

}
