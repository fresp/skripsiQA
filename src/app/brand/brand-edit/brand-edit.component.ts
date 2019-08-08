import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand-read/brand.model';
import { Router, ActivatedRoute } from '@angular/router';
import global from "../../global";
import { MatSnackBar } from '@angular/material';
import { CompanyService } from 'src/app/services/company.service';
import { BrandService } from 'src/app/services/brand.service';
import { NgForm } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnInit {

    brand: Brand = 
    {
      id: "",
      company_id: "",
      name: "",
      desc: "",
      img: "",
      publish: true,
      create_date: ""
    }

    brandEdit = {
      id: "",
      company_id: "",
      name: "",
      desc: "",
      img: "",
      publish: true,
      user_id: "",
      auth_code: ""
    };

    companies : [];
    Listsales: [];
    validateImage = true;
    wrapImage = "";

    detailId: string;
  
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
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailUser();
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

  detailUser(){
    let data = {
      user_id: this.json_locstor.id,
      auth_code: this.json_locstor.auth_code,
      id: this.detailId
    }
    
    this.brandService.detailBrand(data).then(restData => {
      
      if (restData.code == 200) {
        this.brand = restData.result;
        this.brand.id = restData.result._id;
        this.brand.img = global.url_img+"brand/"+restData.result.img;
        console.log("Ini detail brand", this.brand);
        console.log("Ini detail user company", this.brand.company_id);
      }
    }).then( () => {
      this.getListCompany();
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
      this.brandEdit.img = event.target.files[0]; 
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
    console.log("ini user image", this.brand.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.brandEdit.company_id = form.value.company;
        this.brandEdit.name = form.value.name;
        this.brandEdit.desc = form.value.desc;
        if (this.brandEdit.img != "" || this.brandEdit.img != null) {
          this.brandEdit.img; 
        }
        this.brandEdit.publish = form.value.publish;
        this.brandEdit.user_id = this.json_locstor.id;
        this.brandEdit.auth_code = this.json_locstor.auth_code;
        this.brandEdit.id = this.brand.id;
        
        console.log("Ini data user yg di submit", this.brand);
        
        this.brandService.editBrand(this.brandEdit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            this.detailUser();
            this.wrapImage = "";
            
            this.snackbar.open('Updated data success', 'Close', {
              duration: 2500,
              horizontalPosition: "end",
              verticalPosition: "top"
            });

            let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.brand,
              action: global.action.update,
              object: this.json_locstor.firstname+" "+this.json_locstor.lastname,
              status: true
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
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
              module: global.module.brand,
              action: global.action.update,
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
    this.router.navigate(["../../brand"], {relativeTo: this.route});
  }

}
