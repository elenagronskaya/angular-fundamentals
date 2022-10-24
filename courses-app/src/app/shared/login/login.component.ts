import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {UserStoreService} from "../../user/user-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  constructor(private authService: AuthService, private userStoreService: UserStoreService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(loginForm: NgForm): any{
    if (loginForm.status === "VALID") {
      alert(JSON.stringify(loginForm.value, null, 2));
    this.authService.login(loginForm.value).subscribe(() => {
      this.authService.setAuth();
      this.userStoreService.setUserData();
      this.router.navigate(['/'])
    }, error => {});
    }
  }
}
