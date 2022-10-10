import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onLoginSubmit(loginForm: NgForm) {
    if (loginForm.status === "VALID")
    {
      alert(JSON.stringify(loginForm.value, null, 2));
      //redirect
    }
  }
}
