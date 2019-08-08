import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.scss']
})
export class UserInsertComponent implements OnInit {

  items = [
    {id: 1, name: "Dummy Role 1"},
    {id: 2, name: "Dummy Role 2"},
    {id: 3, name: "Dummy Role 3"}
  ];
  
  constructor(
    public dialogRef: MatDialogRef<UserInsertComponent>,
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
