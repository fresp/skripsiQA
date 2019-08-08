import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserData } from '../user/user-read/user.model';
import { LoginService } from '../services/login.service';
import global from "../global";
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  }

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private loginService: LoginService,
  ) { 
      if (localStorage.getItem(global.user_db) !== null) {
        this.router.navigate(["secure"]);
      } else {
        this.router.navigate(["login"]);
      }
    }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.status == "VALID") {

      this.user.email = form.value.email;
      this.user.password = form.value.password;

      this.loginService.login(this.user).then(restData => {
        console.log(restData);
        if(restData.code == 200) {

          let locstor = {
            id: restData.result._id,
            role: restData.result.role,
            firstname: restData.result.firstname,
            lastname: restData.result.lastname,
            auth_code: restData.result.auth_code
          }
          localStorage.setItem(global.user_db, JSON.stringify(locstor))
          this.router.navigate(["/secure"]);
        }
        else if(restData.code == 405){
          this.snackbar.open('E-mail not registered', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 401){
          this.snackbar.open('Wrong Password', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }

      }, err => {
        this.snackbar.open('Something went wrong, contact your IT Support !', 'Close', {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        console.log(err);
      });
      
    }
  }
  
  // goToLogin(){
  //   this.router.navigate(["main"]);
  // }
}
