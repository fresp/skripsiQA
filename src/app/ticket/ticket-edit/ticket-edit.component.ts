import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { TicketService } from 'src/app/services/ticket.service';
import global from "../../global";

import { BoardService } from 'src/app/services/board.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})

export class TicketEditComponent implements OnInit {


  data = {
    board_id :'',
    code: '',
    title: '',
    description: '',
    img : '',
    class_id : '',
    user_id : '',
    device : '',
    platform : '',
    link : '',
    version : '',
    
  };

  data_edit = {
    id : '',
    code: '',
    title: '',
    description: '',
    status: 1,
    qa_list : []

  };
  addList: [];

  url_image = global.url_img+"user/";

  // dob_string = moment(this.data_edit.dob).format;

  detailId: string;
  pathImg : string;
  boardId: string;
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
    private TicketService: TicketService
    // private logService: LogService
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('ticket');
    this.boardId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailUser();
  }

  onChange(event) {
    this.select_platform = event.target.value;
    console.log(this.select_platform);
  }


  getAllUser(){
    if (this.json_locstor !== null) {
      
      let data = {
        id: this.boardId
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
        id: this.boardId
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
  

  detailUser(){
    let data = {
      id: this.detailId
    }
    
    this.TicketService.detailData(data).then(restData => {
      if (restData.code == 200) {
        this.data = restData.result;

        this.pathImg = global.url_img +'/ticket/' +restData.result.img;
        if(restData.result.device != "" || restData.result.device != ""){
          this.data.platform = 'web';
        } else {
          this.data.platform = 'mobile';
        }
        console.log("Ini detail user", this.data);
      }
    }).then( () => {
      this.getAllUser();
      this.getAllClass();
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
        // this.data_edit.password = form.value.password;
        // var date = new Date();
        // date.toISOString
        
        console.log("Data Edited", this.data_edit);
        
        this.TicketService.editData(this.data_edit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            

            let snackBarRef = this.snackbar.open('Updated success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../../Ticket"], {relativeTo: this.route});
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
    this.router.navigate(["../../Ticket"], {relativeTo: this.route});
  }

}
