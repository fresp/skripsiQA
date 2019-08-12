import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import global from "../global";
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  // Convert object into URL
  formData(data): string{
    return Object.keys(data).map(function(key){
      if(Array.isArray(data[key])) {
        return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
      } else {
        return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
      }
    }).join('&');
  }

  logout() {
    localStorage.removeItem(global.user_db);
    if (localStorage.getItem(global.user_db) !== null) {
      this.router.navigate(["/secure"]);
    } else {
      let snackBarRef = this.snackbar.open('Your Success Logout', 'Close', {
        duration: 500,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(["/login"]);
      });
      
    }
  }

  checkSession() {
    if (localStorage.getItem(global.user_db) !== null) {
      this.router.navigate(["/secure"]);
    } else {
      let snackBarRef = this.snackbar.open('Session Expired!', 'Close', {
        duration: 500,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(["/login"]);
      });
    }
  }

}
