import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  
  isIssue = true;
  isMaster = true;
  isUser = true;
  isReport = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {}
  
  toggleMaster(){
    this.isMaster = !this.isMaster;
  }

  toggleIssue(){
    this.isIssue = !this.isIssue;
  }

  toggleUser(){
    this.isUser = !this.isUser;
  }
  
  toggleReport(){
    this.isReport = !this.isReport;
  }
}
