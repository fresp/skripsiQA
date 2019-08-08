import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material';
import { UserData } from '../user-read/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import global from "../../global";
import { CompanyService } from 'src/app/services/company.service';
import { SalesGroupService } from 'src/app/services/sales-group.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.scss']
})
export class UserInsertComponent implements OnInit {

  user = {
    company_id : '',
    salesgroup_id: '',
    employee_no: '',
    img: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    role: '',
    publish: true,
    user_id: '',
    auth_code: ''
  };

  companies : [];
  Listsales: [];
  select_publish = "true";
  validateImage = true;
  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private companyService: CompanyService,
    private SalesGroupService: SalesGroupService,
    private logService: LogService,
  ) { }

  ngOnInit() {
    this.getListCompany();
    this.getListSales();
  }

  getListCompany(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.companyService.AllCompany(data).then(restData => {
        console.log("Company", restData);
        if(restData.code == 200) {
          this.companies = restData.result.data;
        }
        else if(restData.code == 400){
          this.snackbar.open('Fetch data failed, please try again', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 401){
          this.snackbar.open('Invalid input format, your data is not valid', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 403){
          this.snackbar.open('Unauthorized, Please Re-login again', 'Close', {
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
    } else {
      this.router.navigate(["login"]);
    }
  }

  getListSales(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.SalesGroupService.AllSales(data).then(restData => {
        if(restData.code == 200) {
          this.Listsales = restData.result.data;
          console.log("Sales Group", this.Listsales);
        }
        else if(restData.code == 400){
          this.snackbar.open('Fetch data failed, please try again', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        else if(restData.code == 401){
          this.snackbar.open('Invalid input format, your data is not valid', 'Close', {
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
    } else {
      this.router.navigate(["login"]);
    }
  }

  onSelectedImage(event){
    // console.log(event);
    this.validateImage = true;

    if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/png") {
      this.user.img = event.target.files[0]; 
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
    console.log("ini user image", this.user.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.user.company_id = form.value.company;
        this.user.salesgroup_id = form.value.sales;
        this.user.employee_no = form.value.employee_number;
        this.user.firstname = form.value.firstname;
        this.user.lastname = form.value.lastname;
        this.user.phone = form.value.phone;
        this.user.email = form.value.email;
        this.user.password = form.value.password;
        this.user.role = form.value.role;
        this.user.publish = form.value.publish;
        this.user.user_id = this.json_locstor.id;
        this.user.auth_code = this.json_locstor.auth_code;
        
        console.log(this.user);
        
        this.userService.insertUser(this.user).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            
            let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.user,
              action: global.action.insert,
              object: this.user.firstname+" "+this.user.lastname,
              status: true
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });

            let snackBarRef = this.snackbar.open('Registered success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../user"], {relativeTo: this.route});
            });
          }
          else if(restData.code == 400){
            this.snackbar.open('Insert user failed, please try again', 'Close', {
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

          let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.user,
              action: global.action.insert,
              object: this.user.firstname+" "+this.user.lastname,
              status: false
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });

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

  goToUser(){
    this.router.navigate(["../user"], {relativeTo: this.route});
  }
}