import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  template: `
    <p>
      snackbar works!
    </p>
  `,
  styles: []
})
export class SnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
