import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingOptionShareService {
  private sortDescending = new BehaviorSubject(true);


  constructor() {
  }

  getCurrentSortingOption(): Observable<boolean> {
    return this.sortDescending.asObservable();
  }

  setCurrentSortingOption(sortDescending: boolean) {
    console.log('sort descending ' + sortDescending)
    this.sortDescending.next(sortDescending)
  }
}
