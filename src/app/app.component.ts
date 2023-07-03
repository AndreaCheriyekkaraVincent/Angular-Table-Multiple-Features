import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SharedService } from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-log-app';
  searchKeyword: string = ''

  constructor(private sharedService: SharedService) { }

  applyFilter() {
    this.sharedService.updateStringValue(this.searchKeyword.trim().toLowerCase());
  }
}
