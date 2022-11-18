import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

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
