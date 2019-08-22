import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TicketService } from 'src/app/services/ticket.service';
import global from "../../global";
import { NgForm, FormControl } from '@angular/forms';

import { BoardService } from 'src/app/services/board.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-insert',
  templateUrl: './ticket-insert.component.html',
  styleUrls: ['./ticket-insert.component.scss']
})
export class TicketInsertComponent implements OnInit {

  data = {
    board_id :'',
    code: '',
    title: '',
    description: '',
    img : '',
    class_id : '',
    user_id : '',
    device : '',
    link : '',
    version : '',
  };
  detailId: string;
  developer_lists : [];
  class_lists : [];

  select_status = 1;
  select_platform:any
  validateImage = true;
  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private BoardService: BoardService,
    private TicketService: TicketService,
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.getAllUser();
    this.getAllClass();
  }


  onChange(event) {
    this.select_platform = event.target.value;
    console.log(this.select_platform);
  }


  getAllUser(){
    if (this.json_locstor !== null) {
      
      let data = {
        id: this.detailId
      }

      this.BoardService.AllUser(data).then(restData => {
        console.log("All User", restData);
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

  getAllClass(){
    if (this.json_locstor !== null) {
      
      let data = {
        id: this.detailId
      }

      this.BoardService.AllClass(data).then(restData => {
        console.log("All Qa", restData);
        if(restData.code == 200) {
          this.class_lists = restData.result;
          console.log("Isi array line service", this.class_lists);
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
      this.data.img = event.target.files[0]; 
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
    console.log("ini data image", this.data.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {
        this.data.board_id = this.detailId,
        this.data.code = form.value.code;
        this.data.title = form.value.title;
        this.data.description = form.value.description;
        this.data.class_id  = form.value.class_list;
        this.data.user_id  = form.value.developer_list;
        this.data.device  = form.value.device;
        this.data.link  = form.value.link;
        this.data.version  = form.value.version;
        
        console.log(this.data);
        
        this.TicketService.insertData(this.data).then(restData => {
          console.log(restData);
          if(restData.code == 200) {

            let snackBarRef = this.snackbar.open('Registered success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../"], {relativeTo: this.route});
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
    this.router.navigate(["../"], {relativeTo: this.route});
  }

}
