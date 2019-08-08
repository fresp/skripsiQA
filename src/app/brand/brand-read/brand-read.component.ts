import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Brand } from './brand.model';
import global from "../../global";
import { BrandService } from 'src/app/services/brand.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-brand-read',
  templateUrl: './brand-read.component.html',
  styleUrls: ['./brand-read.component.scss']
})
export class BrandReadComponent implements OnInit {

  brand: Brand[];
  total_brand = 0;
  isLoadingResults = true;

  select_publish = "true";
  validateImage = true;
  url_image = global.url_img+"brand/";

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  displayedColumns: string[] = ['action', 'company', 'name', 'img', 'publish', 'create_date'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  config: any;
  brands: [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private logService: LogService
  ) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.brand);
  }

  ngOnInit() {
    this.getList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
// end pagination

getList(){
  let data = {
    user_id: this.json_locstor.id,
    auth_code: this.json_locstor.auth_code,
    page: 1,
    item: 10
  }

  this.brandService.listBrand(data).then(restData => {
    //console.log(restData);

    if (restData.code = 200) {
      this.brands = restData.result.data;
      this.total_brand = restData.result.total.total_data_all;
      //console.log(this.total_brand);

      //console.log (this.brands)


      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.total_brand
      };

      this.isLoadingResults = false;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.brand);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
  })
}

  pageChanged(event) {
    this.config.currentPage = event;
  }

  goToInsert(){
    this.router.navigate(['../brand-insert'], {relativeTo: this.route});
  }

  goToEdit(user_id: string){
    this.router.navigate(["../brand-edit", user_id], {relativeTo: this.route});
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
        
        this.brandService.deleteBrand(data).then(restData => {
          if (restData.code == 200) {

            let role = this.json_locstor.role;
            let log = {
              user_id: this.json_locstor.id,
              auth_code: this.json_locstor.auth_code,
              role: this.json_locstor.role,
              actor: this.json_locstor.firstname+' '+this.json_locstor.lastname+'-'+role.toUpperCase(),
              module: global.module.brand,
              action: global.action.delete,
              object: firstname+" "+lastname,
              status: true
            }
            
            this.logService.insertLog(log).then(restLog => {
              console.log("Success insert log", restLog);
            }, err => {
              console.log("Failed insert log", err);
            });

            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            ).then( () => {
              this.getList();
            })
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
              module: global.module.brand,
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
