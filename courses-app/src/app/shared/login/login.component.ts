import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {UserStoreService} from "../../user/user-store.service";
import { throwError } from 'rxjs';

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
      this.authService.login(loginForm.form.value).subscribe(
        () => {
          this.authService.setAuth();
          this.userStoreService.setUserData();
          this.router.navigate(['/courses']);
        },
        (error) => throwError(error)
      );
    }
  }
}
