import { Component, OnInit } from '@angular/core';

import {CdkDragDrop,  moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

// import { Track, Task } from '../shared/Track.model';
import { Track, Task } from '../shared/Track.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  title = 'angular-drag-drop';
  private tracks: Track[] = require('../shared/data.json');

  items = [
    {id: 1, name: "Dummy Role 1"},
    {id: 2, name: "Dummy Role 2"},
    {id: 3, name: "Dummy Role 3"}
  ];
  

  ngOnInit() {
    
  }


  
  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
  */
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
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
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}


