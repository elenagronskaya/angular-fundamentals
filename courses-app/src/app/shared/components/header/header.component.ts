import {Component, OnInit} from "@angular/core";
import {SessionStorageService} from "../../../auth/services/session-storage.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserStateFacade} from "../../../user/store/user.fasad";
import {AuthStateFacade} from "../../../auth/store/auth.facade";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit{

  constructor(private authStateFacade: AuthStateFacade,
              private sessionStorage: SessionStorageService,
              private userStateFacade: UserStateFacade,
              private router: Router) {

  }

  get userName$(): Observable<string | null> {
    return this.userStateFacade.name$;
  }

  get isAuthorized$() : Observable<boolean> {
    return this.authStateFacade.isAuthorized$;
  }

  logout() {
    this.authStateFacade.closeSession();
  }

  ngOnInit(): void {
    this.authStateFacade.getLogoutSuccess$.subscribe(()=>{
     this.userStateFacade.cleanUserData();
     this.router.navigate(['/login']);
    })
  }
}

