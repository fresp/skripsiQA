import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSpinner } from '@angular/material';
import { UserData } from "./user.model";
import { Router, ActivatedRoute } from '@angular/router';
import { UserInsertComponent } from '../user-insert/user-insert.component';
import global from '../../global';
import 'sweetalert2/src/sweetalert2.scss';
import { UserService } from 'src/app/services/user.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.scss']
})
export class UserReadComponent implements OnInit {

  user: UserData[];
  isLoadingResults = true;
  url_image = global.url_img+"user/";

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  displayedColumns: string[] = ['action', 'company', 'salesgroup', 'employee_no', 'img_user', 'firstname', 'lastname', 'phone', 'email', 'role', 'publish', 'join_date']; //'create_date'
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList(){
    let data = {
      user_id: this.json_locstor.id,
      auth_code: this.json_locstor.auth_code,
      page: 1,
      item: 10
    }

    this.userService.listUser(data).then(restData => {
      console.log(restData);

      if (restData.code = 200) {
        this.user = restData.result.data;

        this.isLoadingResults = false;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.user);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
// end pagination

  goToInsert(){
    this.router.navigate(['../user-insert'], {relativeTo: this.route});
  }

  goToEdit(user_id: string){
    this.router.navigate(["../user-edit", user_id], {relativeTo: this.route});
  }

  openDialogDelete(user_id: string, firstname: string, lastname: string){
    let data = {
      user_id: this.json_locstor.id,
      auth_code: this.json_locstor.auth_code,
      id: user_id
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
        
        this.userService.deleteUser(data).then(restData => {
          if (restData.code == 200) {
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            ).then( () => {
              this.getList();
            })

            let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.user,
              action: global.action.delete,
              object: firstname+" "+lastname,
              status: true
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });
          }
        }).catch( () => {
          Swal.fire(
            'Failed to delete!',
            'Something wrong, Please try another time.',
            'error'
          )

          let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.user,
              action: global.action.delete,
              object: firstname+" "+lastname,
              status: false
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });
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
  
}
