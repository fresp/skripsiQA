import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserQaService } from 'src/app/services/user-qa.service';
import { UserData } from './user-qa.model';
import global from "../../global";

@Component({
  selector: 'app-user-qa-read',
  templateUrl: './user-qa-read.component.html',
  styleUrls: ['./user-qa-read.component.scss']
})
export class UserQaReadComponent implements OnInit {


  user: UserData[];
  
  isLoadingResults = true;
  url_image = global.url_img+"user/";
  url_import_template = global.url_img+"excel/sample.xlsx";

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  displayedColumns: string[] = ['action', 'photo','firstname', 'email', 'status','created_date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UserQaService: UserQaService,
    // private logService: LogService
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList(){
    let data = {
      page: 1,
      item: 500
    }

    this.UserQaService.listProjectManager(data).then(restData => {
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
    this.router.navigate(['../staffQA-insert'], {relativeTo: this.route});
  }

  goToEdit(user_id: string){
    this.router.navigate(["../staffQA-edit", user_id], {relativeTo: this.route});
  }

  openDialogDelete(user_id: string){ //, name: string
    let data = {
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
        
        this.UserQaService.deleteProjectManager(data).then(restData => {
          console.log(restData);
          if (restData.code == 200) {
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            ).then( () => {
              this.getList();
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

  openDialogImport(){
    Swal.fire({
      title: 'Import Data Alumni',
      html:
        'You can download template import excel in <b><a href="'+this.url_import_template+'">here!</a></b>, ',
      input: 'file',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Import',
      showLoaderOnConfirm: true,
      preConfirm: (upload) => {
        console.log("ini upload", upload);
        let data = {
          user_id: this.json_locstor.id,
          auth_code: this.json_locstor.auth_code,
          files: upload
        }

        return this.UserQaService.importProjectManager(data).then(restData => {
          if (restData.code == 200) {
            console.log(restData);            
          }
        }).catch( () => {
          Swal.fire(
            'Failed Import Data!',
            'Something wrong, Please try another time.',
            'error'
          )
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result)=>{
      console.log("ini result", result);
      if (result.value) {
        Swal.fire(
          'Imported!',
          'Your data has been imported.',
          'success'
          ).then( () => {
            this.getList();
          })
      }
    })
  }
  
}
