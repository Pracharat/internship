import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserRole } from 'src/app/models/user/user.model';
import { AppSettings } from 'src/app/app-settings';
import { DataService } from '../core/data.service';
import { LoginParams } from 'src/app/models/auth/auth.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// import { DataService } from '@app-services/core/data.service';

// import { LoginParams } from '@app-models/auth/auth.model';
// import { AppSettings } from 'src/app/app-settings';
// import { UserRole } from '@app-models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {

  url = 'http://localhost:8080/apigw/api/v1' ;

  get isLoggedIn(): boolean {
    const key = 'user';
    return this.isValidCookie(key);
  }

  get roles(): UserRole[] {
    const key = 'roles';
    return this.isValidCookie(key) ? this.getCookie(key) : [];
  }

  constructor(
    http: HttpClient,
    private cookieService: CookieService,
    public router: Router,
    public ngZone: NgZone ,
  ) {
    super(http);
  }

  login(loginParams): Observable<any> {
    const urlLogin = `${this.url}/login`;
    console.log(loginParams);
    return this.post(urlLogin, loginParams);
  }

  logout() {
    const url = `${this.url}/logout`;
    return this.get(url);
  }

  private isValidCookie(key: string): boolean {
    return !!this.cookieService.get(key);
  }

  private getCookie<T>(key: string): T {
    return this.isValidCookie(key) ? JSON.parse(this.cookieService.get(key)) as T : null;
  }
}
