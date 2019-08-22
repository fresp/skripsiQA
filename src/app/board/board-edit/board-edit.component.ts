import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BoardService } from 'src/app/services/board.service';

import { UserDeveloperService } from 'src/app/services/user-developer.service';
import { UserQaService } from 'src/app/services/user-qa.service';
import global from "../../global";
import * as moment from 'moment';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss']
})

export class BoardEditComponent implements OnInit {
  data = {
    code: '',
    title: '',
    description: '',
    status: 1,
    qa_list : [],
    developer_list : []

  };

  data_edit = {
    id : '',
    code: '',
    title: '',
    description: '',
    status: 1,
    qa_list : [], 
    developer_list : []

  };
  developer_lists : [];
  qa_lists : [];

  url_image = global.url_img+"user/";

  // dob_string = moment(this.data_edit.dob).format;

  detailId: string;

  
  line_services : [];
  validateImage = true;

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private BoardService: BoardService,
    private userDeveloperService:UserDeveloperService,
    private userQaService:UserQaService
    // private logService: LogService
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailUser();
  }


  getAllUser(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.userDeveloperService.AllUser(data).then(restData => {
        console.log("All Line", restData);
        if(restData.code == 200) {
          this.developer_lists = restData.result;
          console.log("Isi array line service", this.developer_lists);
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

  getAllQA(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.userQaService.AllUser(data).then(restData => {
        console.log("All Line", restData);
        if(restData.code == 200) {
          this.qa_lists = restData.result;
          console.log("Isi array line service", this.qa_lists);
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
      id: this.detailId
    }
    
    this.BoardService.detailData(data).then(restData => {
      if (restData.code == 200) {
        this.data = restData.result;
        console.log("Ini detail user", this.data);
      }
    }).then( () => {
      this.getAllUser();
      this.getAllQA();
    }).catch( () => {
        this.snackbar.open('Something went wrong, Please try again !', 'Close', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
    })
  }

 

  onSubmit(form: NgForm){
    console.log(form);
    
    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {
        this.data_edit.id = this.detailId;
        this.data_edit.code = form.value.code;
        this.data_edit.title = form.value.title;
        this.data_edit.description = form.value.description;
        this.data_edit.status = form.value.status;
        this.data_edit.qa_list = form.value.qa_list;
        this.data_edit.developer_list = form.value.developer_list;
        // this.data_edit.password = form.value.password;
        // var date = new Date();
        // date.toISOString
        
        console.log("Data Edited", this.data_edit);
        
        this.BoardService.editData(this.data_edit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            

            let snackBarRef = this.snackbar.open('Updated success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../../board"], {relativeTo: this.route});
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
    this.router.navigate(["../../board"], {relativeTo: this.route});
  }

}
