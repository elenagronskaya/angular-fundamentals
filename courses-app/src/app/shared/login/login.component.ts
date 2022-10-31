import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthStateFacade} from "../../auth/store/auth.facade";
import {UserStateFacade} from "../../user/store/user.fasad";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private authStateFacade: AuthStateFacade,
              private userStateFacade: UserStateFacade,
              private router: Router) { }

  ngOnInit(): void {
    this.authStateFacade.getLoginSuccess$.subscribe(()=> {
      this.userStateFacade.getCurrentUser();
    });

    this.userStateFacade.name$.subscribe((name: string | null)=>{
         if (name)
         {
           this.router.navigate(['/courses']);
         }
    })
    this.authStateFacade.getLoginErrorMessage$.subscribe(()=>{

    });
  }

  onLoginSubmit(loginForm: NgForm): any{
    if (loginForm.status === "VALID") {
      this.authStateFacade.login(loginForm.form.value);
    }
  }
}
