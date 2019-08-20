import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TicketService } from 'src/app/services/ticket.service';
import global from "../../global";
import * as moment from 'moment';

import {CdkDragDrop,  moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

// import { Track, Task } from '../shared/Track.model';
import { Track, Task } from '../../shared/Track.model';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {


  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);

  detailId: string;
  data_edit = {
    id : '',
    status: '',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private ticketService: TicketService
    // private logService: LogService
  ) { }
  title = 'angular-drag-drop';
  private tracks: Track[];

  isLoadingResults = true;
  

  ngOnInit() {
    
    this.detailId = this.route.snapshot.paramMap.get('id');
    console.log(this.detailId);

    this.getList();
    // this.detailUser();
  }
  getList(){
    let data = {
      page: 1,
      item: 500
    }

    this.ticketService.listData(data).then(restData => {
      console.log(restData);

      if (restData.code = 200) {
        this.tracks = restData.result;
        console.log(this.tracks);

        this.isLoadingResults = false;
      }
      
    })
  }
  

  
  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
  */
  get trackIds(): string[] {
    return this.tracks.map(track => track.key);
  }

 

  onTalkDrop(event: CdkDragDrop<Task[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given task to the target data array. This happens if
    // a task has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        console.log({data :event.container.data[0].id});
        console.log({new_event :event.container.id});
        if (this.json_locstor !== null) {
          this.data_edit.id = event.container.data[0].id;
          this.data_edit.status = event.container.id;
          this.ticketService.changeStatus(this.data_edit).then(restData => {
            console.log(restData);
            if(restData.code == 200) {
              
  
              let snackBarRef = this.snackbar.open('Status Updated', 'Close', {
                duration: 2000,
                horizontalPosition: "end",
                verticalPosition: "top"
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
        } else {
          this.router.navigate(["login"]);
        }
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  goToBack(){
    this.router.navigate(["../../board"], {relativeTo: this.route});
  }

  goToInsert(){
    this.router.navigate(['../'+this.detailId+'/ticket'], {relativeTo: this.route});
  }

  goToTicketDetail(id: string){
    this.router.navigate(["../"+this.detailId+'/ticket', id], {relativeTo: this.route});
  }

}



