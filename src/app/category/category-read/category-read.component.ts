import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import global from "../../global";
import { Category } from './category.model';

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.scss']
})
export class CategoryReadComponent implements OnInit {

  categories: [];
  isLoadingResults = true;
  url_image = global.url_img+"category/";

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  displayedColumns: string[] = ['action', 'image', 'parent_category', 'name', 'create_date']; //'create_date'
  dataSource: MatTableDataSource<Category>;

  panelOpenState = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
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

    this.categoryService.listCategory(data).then(restData => {

      if (restData.code = 200) {
        console.log(restData);
        if (restData.result.data.parent_id != undefined) {
          console.log("name parent id", restData.result.data.parent_id.name); 
        }

        this.categories = restData.result.data;

        this.isLoadingResults = false;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.categories);

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
    this.router.navigate(['../category-insert'], {relativeTo: this.route});
  }

  goToEdit(user_id: string){
    this.router.navigate(["../category-edit", user_id], {relativeTo: this.route});
  }

  openDialogDelete(user_id: string, name: string){
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
        
        this.categoryService.deleteCategory(data).then(restData => {
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
              module: global.module.category,
              action: global.action.delete,
              object: name,
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
              module: global.module.category,
              action: global.action.delete,
              object: name,
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
