import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
})
export class MarketingComponent implements OnInit {
  constructor(
  ) {}
  ngOnInit(): void {
   const scrollPosition=localStorage.getItem('scrollPosition')
   if(scrollPosition)
      window.scrollTo(0,+scrollPosition)
      localStorage.removeItem('scrollPosition')
  }
}
