import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import global from "../global";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: "",
    type: ""
  }

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private loginService: LoginService,
  ) { 
      if (localStorage.getItem(global.user_db) !== null) {
        this.router.navigate(["/secure"]);
      } else {
        this.router.navigate(["/login"]);
      }
    }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.status == "VALID") {

      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.type = form.value.type;

      this.loginService.login(this.user).then(restData => {
        console.log(restData);
        if(restData.code == 200) {

          let locstor = {
            user: restData.result.user,
            tokens: restData.result.tokens
          }
          localStorage.setItem(global.user_db, JSON.stringify(locstor))
          this.router.navigate(["/secure"]);
        }
        else if(restData.code == 400){
          this.snackbar.open('Invalid input', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 401){
          this.snackbar.open('Login Failed', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 405){
          this.snackbar.open('E-mail not registered', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 406){
          this.snackbar.open('Account inactive', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 407){
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

}
