import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserDeveloperService } from 'src/app/services/user-developer.service';
import global from "../../global";
import * as moment from 'moment';

@Component({
  selector: 'app-user-developer-edit',
  templateUrl: './user-developer-edit.component.html',
  styleUrls: ['./user-developer-edit.component.scss']
})
export class UserDeveloperEditComponent implements OnInit {

  projectManager = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    img: '',
    status: 1
  };

  projectManager_edit = {
    id : '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    img: '',
    status: 1
  };

  url_image = global.url_img+"user/";

  // dob_string = moment(this.projectManager_edit.dob).format;

  detailId: string;

  line_services : [];
  validateImage = true;

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private UserDeveloperService: UserDeveloperService
    // private logService: LogService
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailUser();
  }

  

  detailUser(){
    let data = {
      id: this.detailId
    }
    
    this.UserDeveloperService.detailProjectManager(data).then(restData => {
      
      if (restData.code == 200) {
        this.projectManager = restData.result;
        this.projectManager.img = restData.result.img;
        this.projectManager.password = '';
        console.log("Ini detail user", this.projectManager);
      }
    }).then( () => {
    }).catch( () => {
        this.snackbar.open('Something went wrong, Please try again !', 'Close', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
    })
  }

  onSelectedImage(event){
    // console.log(event);
    this.validateImage = true;

    if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/png") {
      this.projectManager_edit.img = event.target.files[0]; 
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
        this.projectManager_edit.id = this.detailId;
        this.projectManager_edit.email = form.value.email;
        this.projectManager_edit.firstname = form.value.firstname;
        this.projectManager_edit.lastname = form.value.lastname;
        this.projectManager_edit.status = form.value.status;
        // this.projectManager_edit.password = form.value.password;
        // var date = new Date();
        // date.toISOString
        
        console.log("Data Edited", this.projectManager_edit);
        
        this.UserDeveloperService.editProjectManager(this.projectManager_edit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            

            let snackBarRef = this.snackbar.open('Updated success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../../staffDeveloper"], {relativeTo: this.route});
            });
          }
          else if(restData.code == 400){
            this.snackbar.open('Update failed, please try again', 'Close', {
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

          // let role = this.json_locstor.role;
          //   let log = {
          //     user_id: this.json_locstor.id,
          //     auth_code: this.json_locstor.auth_code,
          //     role: this.json_locstor.role,
          //     actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
          //     module: global.module.user,
          //     action: global.action.insert,
          //     object: this.user.firstname+" "+this.user.lastname,
          //     status: false
          //   }
            
          //   this.logService.insertLog(log).then(restLog => {
          //     console.log("Success insert log", restLog);
          //   }, err => {
          //     console.log("Failed insert log", err);
          //   });

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
    this.router.navigate(["../../staffDeveloper"], {relativeTo: this.route});
  }

}
