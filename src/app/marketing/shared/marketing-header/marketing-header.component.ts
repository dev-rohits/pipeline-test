import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-marketing-header',
  templateUrl: './marketing-header.component.html',
  styleUrls: ['./marketing-header.component.scss'],
})
export class MarketingHeaderComponent implements OnInit {
  isLogin:boolean=false
  role!: any;
  constructor(public authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.isLogin=this.authService.isLogin
  }
  openDashboard(){
    this.role=JSON.parse(localStorage.getItem('auth') as string).role.roleType;
    if(this.role =='Student'){
      this.router.navigate(['/student/enrollments']);
    }else if(this.role =='Teacher'){
      this.router.navigate(['/teacher/enrollments']);
    }else{
      this.router.navigate(['/admin/enrollments']);
    }
  }
}
