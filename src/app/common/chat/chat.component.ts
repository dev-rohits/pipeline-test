import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  openChat:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
open(){
this.openChat=!this.openChat
}
}
