import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent implements OnInit {
  @Output('scrolltocontact')
  scrolltocontact: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }
scroll(id:any){
  this.scrolltocontact.emit(id);
}
}
