import { Component, OnInit } from '@angular/core';
import { Category } from '../category-read/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';
import { LogService } from 'src/app/services/log.service';
import global from "../../global";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  dataCategory: Category = 
    {
      id: "",
      parent_id: "",
      name: "",
      desc: "",
      img: "",
      publish: true
    }

    categoryEdit = {
      id: "",
      parent_id: "",
      name: "",
      desc: "",
      img: "",
      publish: true,
      user_id: "",
      auth_code: ""
    };

    categories : [];
    validateImage = true;
    wrapImage = "";

    detailId: string;
  
    locstor = localStorage.getItem(global.user_db);
    json_locstor = JSON.parse(this.locstor);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private categoryService: CategoryService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailCategory();
  }

  getListParentCategory(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.categoryService.AllCategory(data).then(restData => {
        console.log("Category Data", restData.result.data);
        if(restData.code == 200) {
          this.categories = restData.result.data;
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

  detailCategory(){
    let data = {
      user_id: this.json_locstor.id,
      auth_code: this.json_locstor.auth_code,
      id: this.detailId
    }
    
    this.categoryService.detailCategory(data).then(restData => {
      
      if (restData.code == 200) {
        this.dataCategory = restData.result;
        // this.category.id = restData.result._id;
        this.dataCategory.parent_id = restData.result.parent_id;
        this.dataCategory.img = global.url_img+"category/"+restData.result.img;
        console.log("Ini detail category", this.dataCategory);
      }
    }).then( () => {
      this.getListParentCategory();
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
      this.categoryEdit.img = event.target.files[0]; 
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
    console.log("ini user image", this.dataCategory.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.categoryEdit.parent_id = form.value.category;
        this.categoryEdit.name = form.value.name;
        this.categoryEdit.desc = form.value.desc;
        if (this.categoryEdit.img != "" || this.categoryEdit.img != null) {
          this.categoryEdit.img; 
        }
        this.categoryEdit.publish = form.value.publish;
        this.categoryEdit.user_id = this.json_locstor.id;
        this.categoryEdit.auth_code = this.json_locstor.auth_code;
        this.categoryEdit.id = this.detailId;
        
        console.log("Ini data user yg di submit", this.categoryEdit);
        
        this.categoryService.editCategory(this.categoryEdit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            this.detailCategory();
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
              module: global.module.category,
              action: global.action.update,
              object: this.categoryEdit.name,
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
              module: global.module.category,
              action: global.action.update,
              object: this.categoryEdit.name,
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

  goToCategory(){
    this.router.navigate(["../../category"], {relativeTo: this.route});
  }

}
