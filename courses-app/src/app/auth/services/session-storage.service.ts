import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  tokenKey = '';


  constructor() {
    this.tokenKey = "token";
  }

  setToken(token: string) {
    window.sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.tokenKey) ;
  }

  deleteToken() {
    window.sessionStorage.removeItem(this.tokenKey);
  }
}
