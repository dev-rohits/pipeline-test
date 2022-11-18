import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-nrich-for-student',
  templateUrl: './nrich-for-student.component.html',
  styleUrls: ['./nrich-for-student.component.scss'],
})
export class NrichForStudentComponent implements OnInit,OnDestroy {
  constructor() {}

  ngOnInit(): void {
    const position=localStorage.getItem('scrollPosition')
    if(position){
      window.scrollTo(0,+position)
      localStorage.removeItem('scrollPosition')
    }
  }

  ngOnDestroy(): void {
    localStorage.setItem('scrollPosition', document.documentElement.scrollTop.toString())
  }
}
