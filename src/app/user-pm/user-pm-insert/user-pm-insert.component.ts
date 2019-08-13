import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserPmService } from 'src/app/services/user-pm.service';
import global from "../../global";
import { NgForm, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-user-pm-insert',
  templateUrl: './user-pm-insert.component.html',
  styleUrls: ['./user-pm-insert.component.scss']
})
export class UserPmInsertComponent implements OnInit {

  projectManager = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    img: '',
    status: 1
  };

  line_services: [];
  select_status = 1;
  validateImage = true;
  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private userPmService: UserPmService,
  ) { }

  ngOnInit() {
    
  }

 

  onSelectedImage(event){
    // console.log(event);
    this.validateImage = true;

    if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/png") {
      this.projectManager.img = event.target.files[0]; 
    } 
    else {
      this.snackbar.open('Please select correct file format attachment (jpg, jpeg, png)', 'Close', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      });

      this.validateImage = false;
      console.log(this.validateImage);
    }
    console.log("ini projectManager image", this.projectManager.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.projectManager.email = form.value.email;
        this.projectManager.firstname = form.value.firstname;
        this.projectManager.lastname = form.value.lastname;
        this.projectManager.status = form.value.status;
        this.projectManager.password = form.value.password;
        
        console.log(this.projectManager);
        
        this.userPmService.insertProjectManager(this.projectManager).then(restData => {
          console.log(restData);
          if(restData.code == 200) {

            let snackBarRef = this.snackbar.open('Registered success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../projectManager"], {relativeTo: this.route});
            });
          }
          else if(restData.code == 400){
            this.snackbar.open('Insert failed, please try again', 'Close', {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          else if(restData.code == 401){
            this.snackbar.open('Invalid input format', 'Close', {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          else if(restData.code == 402){
            this.snackbar.open('Email already registered, please use another email !', 'Close', {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          else if(restData.code == 403){
            this.snackbar.open('Unauthorized', 'Close', {
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
    } else {
      this.router.navigate(["login"]);
    }
  }

  goToBack(){
    this.router.navigate(["../projectManager"], {relativeTo: this.route});
  }

}
