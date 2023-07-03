import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private stringValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getStringValue() {
    return this.stringValue$.asObservable();
  }

  updateStringValue(newValue: string) {
    this.stringValue$.next(newValue);
  }
}
