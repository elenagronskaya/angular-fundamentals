import {Component} from "@angular/core";
import {AuthService} from "../../../auth/services/auth.service";
import {SessionStorageService} from "../../../auth/services/session-storage.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserStoreService} from "../../../user/user-store.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent {
  isLogin$: Observable<boolean>;
  login = 'Login';
  logout = 'Logout';

  constructor(private authService: AuthService,
              private sessionStorage: SessionStorageService,
              private userStoreService: UserStoreService,
              private router: Router) {
    this.isLogin$ =  this.authService.isAuthorized$;
  }

  loginlogOut(): void {
    this.isLogin$.subscribe((value)=>{
      if (value) {
        this.doLogout()
      }else {
        this.router.navigate(['/login']);
      }
    }
    );
  }
  get userName(): Observable<string> {
    return this.userStoreService.name$;
  }

  doLogout() {
    this.authService.logout().subscribe(()=>{this.router.navigate(['/login'])}
    );
  }
}

