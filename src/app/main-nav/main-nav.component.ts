import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isAlumni = true;
  isAlumniVerif = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private utilityService: UtilityService,

  ) {
    this.utilityService.checkSession();
  }

  toggleAlumni(){
    this.isAlumni = !this.isAlumni;
  }

  toogleLogout(){
    this.utilityService.logout();
  }

}
