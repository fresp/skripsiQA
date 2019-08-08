import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  roles = [
    {value: 'pm', name: "Project Manager"},
    {value: 'qa', name: "Quality Assurance"},
    {value: 'user', name: "Programmer"}
  ];

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(["secure"]);
  }
}
