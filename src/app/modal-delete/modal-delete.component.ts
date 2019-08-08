import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalDeleteComponent>,
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
