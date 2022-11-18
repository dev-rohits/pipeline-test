import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Output('desktopHamburgerClick')
  desktopHamburgerClick: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  opensidebar!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const url = localStorage.getItem('redirectRoute')
    if (url) {
      this.router.navigate([url])
      localStorage.removeItem('redirectRoute')
    }
  }
  toggleDesktopSidebarOpen(value: Boolean) {
    this.opensidebar = value
  }

}
