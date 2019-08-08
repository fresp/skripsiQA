import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from '../log.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import global from "../../global";
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-read',
  templateUrl: './log-read.component.html',
  styleUrls: ['./log-read.component.scss']
})
export class LogReadComponent implements OnInit {

    log: Log[] =  [];

    isLoadingResults = true;

    locstor = localStorage.getItem(global.user_db);
    json_locstor = JSON.parse(this.locstor);
  
    displayedColumns: string[] = ['action_date', 'message'];
    dataSource: MatTableDataSource<Log>;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private logService: LogService,
    ) {
  
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.log);
    }
  
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
  
      this.logService.listLog(data).then(restData => {
        console.log(restData);
  
        if (restData.code = 200) {
          this.log = restData.result.data;
          this.log.push();
  
          this.isLoadingResults = false;
  
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.log);
  
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
    this.router.navigate(['../log-insert'], {relativeTo: this.route});
  }

  goToEdit(user_id: string){
    this.router.navigate(["../log-edit", user_id], {relativeTo: this.route});
  }

}
