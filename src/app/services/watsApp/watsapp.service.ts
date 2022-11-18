import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatsappService {

  buttonStatus!: boolean;

  buttonVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor()  {
      this.buttonVisibilityChange.subscribe((value) => {
          this.buttonStatus = value
      });
  }

  changeButtonVisibility(check:boolean) {
      this.buttonVisibilityChange.next(check);
  }
}
