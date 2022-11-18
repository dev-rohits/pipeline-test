import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-social-connect',
  templateUrl: './social-connect.component.html',
  styleUrls: ['./social-connect.component.scss']
})
export class SocialConnectComponent implements OnInit {
  @Output('desktopHamburgerClick')
  desktopHamburgerClick : EventEmitter<Boolean> = new EventEmitter<Boolean>();
  opensidebar!: any;
  constructor() { }

  ngOnInit(): void {
    
  }
  toggleDesktopSidebarOpen(value : Boolean){
  

    this.opensidebar=value
}
}
