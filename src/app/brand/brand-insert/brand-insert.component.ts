import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import global from "../../global";
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-brand-insert',
  templateUrl: './brand-insert.component.html',
  styleUrls: ['./brand-insert.component.scss']
})
export class BrandInsertComponent implements OnInit {

  brand: {
    company_id: string,
    name: string,
    desc: string,
    img: string,
    publish: boolean,
    user_id: string,
    auth_code: string
  } = {
    company_id: '',
    name: '',
    desc: '',
    img: '',
    publish: true,
    user_id: '',
    auth_code: '',
  }

  companies : [];
  select_publish = "true";
  validateImage = true;

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private companyService: CompanyService,
    private brandService: BrandService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.getListCompany();
  }

  getListCompany(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code,
        page: 1,
        item: 10
      }

      this.companyService.getList(data).then(restData => {
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

  onSelectedImage(event){
    // console.log(event);
    this.validateImage = true;

    if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/png") {
      this.brand.img = event.target.files[0]; 
    } 
    else {
      this.snackbar.open('Please select correct file format attachment (jpg, jpeg, png)', 'Close', {
        duration: 2500,
        horizontalPosition: "end",
        verticalPosition: "top"
      });

      this.validateImage = false;
    }
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.brand.company_id = form.value.company;
        this.brand.name = form.value.name;
        this.brand.desc = form.value.desc;
        this.brand.publish = form.value.publish;
        this.brand.user_id = this.json_locstor.id;
        this.brand.auth_code = this.json_locstor.auth_code;
        
        console.log(this.brand);
        
        this.brandService.insertBrand(this.brand).then(restData => {
          console.log(restData);
          if(restData.code == 200) {

            let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.brand,
              action: global.action.insert,
              object: this.json_locstor.firstname+" "+this.json_locstor.lastname,
              status: true
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });

            let snackBarRef = this.snackbar.open('Insert brand success', 'Close', {
              duration: 1500,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../brand"], {relativeTo: this.route});
            });
          }
          else if(restData.code == 400){
            this.snackbar.open('Insert brand failed, please try again', 'Close', {
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
            this.snackbar.open('Brand already exist, please use another name !', 'Close', {
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
              module: global.module.brand,
              action: global.action.insert,
              object: this.json_locstor.firstname+" "+this.json_locstor.lastname,
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

  goToBrand(){
    this.router.navigate(["../brand"], {relativeTo: this.route});
  }
}
