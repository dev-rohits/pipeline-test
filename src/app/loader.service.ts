import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, concatMap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading$=new BehaviorSubject<boolean>(false);
  private totalRequests=0;
  constructor() { }

  showLoader<T>(appliedOn: Observable<T>) {
    this.totalRequests=this.totalRequests+1
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => appliedOn),
        finalize(() => {
          this.totalRequests=this.totalRequests-1
          if(this.totalRequests==0){
            this.loadingOff()
          }
        }))
  }

  loadingOn() {
    this.loading$.next(true);
  }
  loadingOff() {
    this.loading$.next(false);
  }
}
