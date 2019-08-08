import { Component } from '@angular/core';
import global from "./global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salestar-web';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){}
  
}
