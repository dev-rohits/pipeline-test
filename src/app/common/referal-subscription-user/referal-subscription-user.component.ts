import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referal-subscription-user',
  templateUrl: './referal-subscription-user.component.html',
  styleUrls: ['./referal-subscription-user.component.scss']
})
export class ReferalSubscriptionUserComponent implements OnInit {

  user!: any [];
  couponcode: any;
  link!: string;

  constructor(    private subscriptionService: SubscriptionService,) { }

  ngOnInit(): void {
    this.subscriptionService.getcurrentplan().subscribe((data: any) => {
     
      this.user = data.body.users.users.reverse();;
      this.couponcode = data.body.code;
      // this.link =
      //   environment.signupRoute + '/auth/signup?code=' + this.couponcode;
    
    
    });
  }
  showMessage() {
    Swal.fire("","Referal Code Copied successfully!","success")
  }

}