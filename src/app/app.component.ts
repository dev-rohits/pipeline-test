import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nrichUI';
  constructor(public loaderService:LoaderService){

  }
  ngOnInit(): void {
    const element=document.getElementById('zmmtg-root');
    if(element) element.style.display='none'
  }
}
