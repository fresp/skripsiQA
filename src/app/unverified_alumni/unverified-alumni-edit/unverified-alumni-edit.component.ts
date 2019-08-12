import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LineOfServiceService } from 'src/app/services/line-of-service.service';
import { UnverifiedAlumniService } from 'src/app/services/unverified-alumni.service';
import Swal from 'sweetalert2';
import global from "../../global";
import { InvitedAlumniService } from 'src/app/services/invited-alumni.service';

@Component({
  selector: 'app-unverified-alumni-edit',
  templateUrl: './unverified-alumni-edit.component.html',
  styleUrls: ['./unverified-alumni-edit.component.scss']
})
export class UnverifiedAlumniEditComponent implements OnInit {

  unverified_alumni = {
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

  unverified_alumni_edit = {
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
    private unverifiedAlumniService: UnverifiedAlumniService,
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
    
    this.unverifiedAlumniService.detailUnverifiedAlumni(data).then(restData => {
      
      if (restData.code == 200) {
        this.unverified_alumni = restData.result;
        this.unverified_alumni.img = restData.result.img;
        console.log("Ini detail user", this.unverified_alumni);
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
      this.unverified_alumni_edit.img = event.target.files[0]; 
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
    console.log("ini invited_alumni image", this.unverified_alumni.img);
  }

  onSubmit(form: NgForm){
    console.log(form);

    if (this.json_locstor !== null) {
      if (form.status == "VALID" && this.validateImage) {

        this.unverified_alumni_edit.user_id = this.json_locstor.id;
        this.unverified_alumni_edit.auth_code = this.json_locstor.auth_code;
        this.unverified_alumni_edit.type_alumni = form.value.type_alumni;
        this.unverified_alumni_edit.alumni_name = form.value.alumni_name;
        this.unverified_alumni_edit.email = form.value.email;
        this.unverified_alumni_edit.gender = form.value.gender;
        this.unverified_alumni_edit.company = form.value.company;
        this.unverified_alumni_edit.position = form.value.position;
        this.unverified_alumni_edit.phone = form.value.phone;
        this.unverified_alumni_edit.dob = form.value.dob;
        this.unverified_alumni_edit.lineservice_id = form.value.line;
        this.unverified_alumni_edit.publish = form.value.publish;
        this.unverified_alumni_edit.id = this.detailId;
        // var date = new Date();
        // date.toISOString
        
        console.log("Data Edited", this.unverified_alumni_edit);
        
        this.unverifiedAlumniService.editUnverifiedAlumni(this.unverified_alumni_edit).then(restData => {
          console.log(restData);
          if(restData.code == 200) {
            
            // let role = this.json_locstor.role;
            // let log = {
            //   user_id: this.json_locstor.id,
            //   auth_code: this.json_locstor.auth_code,
            //   role: this.json_locstor.role,
            //   actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
            //   module: global.module.user,
            //   action: global.action.insert,
            //   object: this.user.firstname+" "+this.user.lastname,
            //   status: true
            // }
            
            // this.logService.insertLog(log).then(restLog => {
            //   console.log("Success insert log", restLog);
            // }, err => {
            //   console.log("Failed insert log", err);
            // });

            let snackBarRef = this.snackbar.open('Updated success', 'Close', {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(["../../unverified-alumni"], {relativeTo: this.route});
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

  openDialogDelete(){ //, name: string
    let data = {
      user_id: this.json_locstor.id,
      auth_code: this.json_locstor.auth_code,
      id: this.detailId
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        
        this.invitedAlumniService.deleteInvitedAlumni(data).then(restData => {
          console.log(restData);
          if (restData.code == 200) {
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            ).then( () => {
              this.router.navigate(["../../unverified-alumni"], {relativeTo: this.route});
            })

            // let role = this.json_locstor.role;
            // let log = {
            //   user_id: this.json_locstor.id,
            //   auth_code: this.json_locstor.auth_code,
            //   role: this.json_locstor.role,
            //   actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
            //   module: global.module.user,
            //   action: global.action.delete,
            //   object: firstname+" "+lastname,
            //   status: true
            // }
            
            // this.logService.insertLog(log).then(restLog => {
            //   console.log("Success insert log", restLog);
            // }, err => {
            //   console.log("Failed insert log", err);
            // });
                      
          }
        }).catch( () => {
          Swal.fire(
            'Failed to delete!',
            'Something wrong, Please try another time.',
            'error'
          )

          // let role = this.json_locstor.role;
          //   let log = {
          //     user_id: this.json_locstor.id,
          //     auth_code: this.json_locstor.auth_code,
          //     role: this.json_locstor.role,
          //     actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
          //     module: global.module.user,
          //     action: global.action.delete,
          //     object: firstname+" "+lastname,
          //     status: false
          //   }
            
          //   this.logService.insertLog(log).then(restLog => {
          //     console.log("Success insert log", restLog);
          //   }, err => {
          //     console.log("Failed insert log", err);
          //   });
        })
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    });
  }

  goToBack(){
    this.router.navigate(["../../unverified-alumni"], {relativeTo: this.route});
  }

}
