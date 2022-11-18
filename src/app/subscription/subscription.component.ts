import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit,OnDestroy {

  @Output('desktopHamburgerClick')
  desktopHamburgerClick : EventEmitter<Boolean> = new EventEmitter<Boolean>();
  opensidebar!: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.setItem('scrollPosition', document.documentElement.scrollTop.toString())
  }
  
  toggleDesktopSidebarOpen(value : Boolean){
    this.opensidebar=value
}
}

