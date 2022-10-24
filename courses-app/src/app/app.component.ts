import { Component } from '@angular/core';
import {UserStoreService} from "./user/user-store.service";
import {Observable} from "rxjs";
import {AuthService} from "./auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  isEditable: boolean = false;
  constructor(private userStoreService: UserStoreService, private authService: AuthService, private router: Router) {
  }
  get userName(): Observable<string> {

    return this.userStoreService.name$;
  }
  ngOnInit(): void {
    this.isEditable = true;
  }

  logout() {
    this.authService.logout().subscribe(()=>{this.router.navigate(['/login'])}
    );
 }
}
