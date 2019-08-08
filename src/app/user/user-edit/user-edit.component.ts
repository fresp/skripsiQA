import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from '../user-read/user.model';
import { UserService } from 'src/app/services/user.service';
import global from "../../global";
import { MatSnackBar } from '@angular/material';
import { CompanyService } from 'src/app/services/company.service';
import { SalesGroupService } from 'src/app/services/sales-group.service';
import { NgForm } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user = {
    id: '',
    company_id: '',
    salesgroup_id: '',
    employee_no: '',
    img: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    salt: '',
    password: '',
    role: '',
    publish: true,
    user_id: '',
    auth_code: ''
  };

  userEdit = {
    id: '',
    company_id: '',
    salesgroup_id: '',
    employee_no: '',
    img: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    salt: '',
    password: '',
    role: '',
    publish: true,
    user_id: '',
    auth_code: ''
  };

  detailId: string;

  companies : [];
  Listsales: [];
  validateImage = true;

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private companyService: CompanyService,
    private SalesGroupService: SalesGroupService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailUser();
  }

  getListCompany(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.companyService.AllCompany(data).then(restData => {
        console.log("Company Data", restData.result.data);
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

  detailUser(){
    let data = {
      user_id: this.json_locstor.id,
      auth_code: this.json_locstor.auth_code,
      id: this.detailId
    }
    
    this.userService.detailUser(data).then(restData => {
      
      if (restData.code == 200) {
        this.user = restData.result;
        this.user.id = restData.result._id;
        this.user.img = global.url_img+"user/"+restData.result.img;
        console.log("Ini detail user", this.user);
        console.log("Ini detail user company", this.user.company_id);
      }
    }).then( () => {
      this.getListCompany();
      this.getListSales();
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
      this.userEdit.img = event.target.files[0]; 
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

        this.userEdit.company_id = form.value.company;
        this.userEdit.salesgroup_id = form.value.sales;
        this.userEdit.employee_no = form.value.employee_number;
        if (this.userEdit.img != "" || this.userEdit.img != null) {
          this.userEdit.img; 
        }
        this.userEdit.firstname = form.value.firstname;
        this.userEdit.lastname = form.value.lastname;
        this.userEdit.phone = form.value.phone;
        this.userEdit.email = form.value.email;
        if (form.value.password != "" || form.value.password != null) {
          this.userEdit.password = form.value.password; 
        }
        this.userEdit.salt = this.user.salt;
        this.userEdit.role = form.value.role;
        this.userEdit.publish = form.value.publish;
        this.userEdit.user_id = this.json_locstor.id;
        this.userEdit.auth_code = this.json_locstor.auth_code;
        this.userEdit.id = this.user.id;
        
        console.log("Ini data user yg di submit", this.user);
        
        this.userService.editUser(this.userEdit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            this.detailUser();

            let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.user,
              action: global.action.update,
              object: this.user.firstname+" "+this.user.lastname,
              status: true
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });

            this.snackbar.open('Updated data success', 'Close', {
              duration: 2500,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          else if(restData.code == 401){
            this.snackbar.open('Invalid input format.', 'Close', {
              duration: 2500,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          else if(restData.code == 400){
            this.snackbar.open('Update failed, please try again.', 'Close', {
              duration: 2500,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
          }
          else if(restData.code == 403){
            this.snackbar.open('Unauthorized', 'Close', {
              duration: 2500,
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
            action: global.action.update,
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
    this.router.navigate(["../../user"], {relativeTo: this.route});
  }

}
