import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TicketService } from 'src/app/services/ticket.service';
import global from "../../global";
import { NgForm, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-insert',
  templateUrl: './ticket-insert.component.html',
  styleUrls: ['./ticket-insert.component.scss']
})
export class TicketInsertComponent implements OnInit {

  data = {
    code: '',
    title: '',
    description: '',
    status: 1
  };

  select_status = 1;
  validateImage = true;
  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private TicketService: TicketService,
  ) { }

  ngOnInit() {
    
  }

 

  // onSelectedImage(event){
  //   // console.log(event);
  //   this.validateImage = true;

  //   if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/png") {
  //     this.data.img = event.target.files[0]; 
  //   } 
  //   else {
  //     this.snackbar.open('Please select correct file format attachment (jpg, jpeg, png)', 'Close', {
  //       duration: 3000,
  //       horizontalPosition: "end",
  //       verticalPosition: "top"
  //     });

  //     this.validateImage = false;
  //     console.log(this.validateImage);
  //   }
  //   console.log("ini data image", this.data.img);
  // }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.data.code = form.value.code;
        this.data.title = form.value.title;
        this.data.description = form.value.description;
        this.data.status = form.value.status;
        
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
              this.router.navigate(["../Ticket"], {relativeTo: this.route});
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
    this.router.navigate(["../Ticket"], {relativeTo: this.route});
  }

}
