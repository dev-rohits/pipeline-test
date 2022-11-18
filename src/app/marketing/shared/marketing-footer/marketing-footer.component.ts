import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marketing-footer',
  templateUrl: './marketing-footer.component.html',
  styleUrls: ['./marketing-footer.component.scss']
})
export class MarketingFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

commingSoon(){
Swal.fire({
  position: 'top-end',
  title: 'Comming Soon !',
  showConfirmButton: false,
  timer: 1500,
  width:300,
})
}

}
