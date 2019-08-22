import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { InvitedAlumniService } from 'src/app/services/invited-alumni.service';
import { LineOfServiceService } from 'src/app/services/line-of-service.service';
import global from "../../global";
import * as moment from 'moment';

@Component({
  selector: 'app-invited-alumni-edit',
  templateUrl: './invited-alumni-edit.component.html',
  styleUrls: ['./invited-alumni-edit.component.scss']
})
export class InvitedAlumniEditComponent implements OnInit {

  invited_alumni = {
    // id: '',
    user_id: '',
    auth_code: '',
    type: '',
    alumni: '',
    alumni_name : '',
    email: '',
    gender: '',
    company: '',
    position: '',
    phone: '',
    dob: new FormControl(new Date()),
    lineservice_id: '',
    img: '',
    publish: 1
  };

  invited_alumni_edit = {
    id: '',
    user_id: '',
    auth_code: '',
    type_alumni: '',
    alumni_name : '',
    email: '',
    gender: '',
    company: '',
    position: '',
    phone: '',
    dob: new FormControl(moment(new Date()).format("YYYY-MM-DD")),
    lineservice_id: '',
    img: '',
    publish: 1
  };

  url_image = global.url_img+"user/";

  // dob_string = moment(this.invited_alumni_edit.dob).format;

  detailId: string;

  line_services : [];
  validateImage = true;

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private invitedAlumniService: InvitedAlumniService,
    private lineOfService: LineOfServiceService
    // private logService: LogService
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.detailUser();
  }

  getAllLine(){
    if (this.json_locstor !== null) {
      
      let data = {
        user_id: this.json_locstor.id,
        auth_code: this.json_locstor.auth_code
      }

      this.lineOfService.AllLine(data).then(restData => {
        console.log("All Line", restData);
        if(restData.code == 200) {
          this.line_services = restData.result;
          console.log("Isi array line service", this.line_services);
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
    
    this.invitedAlumniService.detailInvitedAlumni(data).then(restData => {
      
      if (restData.code == 200) {
        this.invited_alumni = restData.result;
        this.invited_alumni.img = restData.result.img;
        console.log("Ini detail user", this.invited_alumni);
      }
    }).then( () => {
      this.getAllLine();
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
      this.invited_alumni_edit.img = event.target.files[0]; 
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
    console.log("ini invited_alumni image", this.invited_alumni.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.invited_alumni_edit.user_id = this.json_locstor.id;
        this.invited_alumni_edit.auth_code = this.json_locstor.auth_code;
        this.invited_alumni_edit.type_alumni = form.value.type_alumni;
        this.invited_alumni_edit.alumni_name = form.value.alumni_name;
        this.invited_alumni_edit.email = form.value.email;
        this.invited_alumni_edit.gender = form.value.gender;
        this.invited_alumni_edit.company = form.value.company;
        this.invited_alumni_edit.position = form.value.position;
        this.invited_alumni_edit.phone = form.value.phone;
        this.invited_alumni_edit.dob = form.value.dob;
        this.invited_alumni_edit.lineservice_id = form.value.line;
        this.invited_alumni_edit.publish = form.value.publish;
        this.invited_alumni_edit.id = this.detailId;
        // var date = new Date();
        // date.toISOString
        
        console.log("Data Edited", this.invited_alumni_edit);
        
        this.invitedAlumniService.editInvitedAlumni(this.invited_alumni_edit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            
         

            let snackBarRef = this.snackbar.open('Updated success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../../invited-alumni"], {relativeTo: this.route});
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
    this.router.navigate(["../../invited-alumni"], {relativeTo: this.route});
  }

}
