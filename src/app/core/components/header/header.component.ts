import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ToggleMenuService } from '@app-services/common/toggle-menu.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '@app-services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDisplayButton$: Observable<boolean>;
  username: string;

  constructor(
    private menuService: ToggleMenuService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.isDisplayButton$ = this.menuService.isDisplayMenuButton$;

    //ทำงานเฉพาะตอน navigationสุดท้าย
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(
      event => {
        this.getUserFromLocalStorage(); //ทำการอ่านค่าจาก loalstorage
      }
    );
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private getUserFromLocalStorage() {
    const userString = localStorage.getItem('login');
    if (!userString) { //ถ้าไม่มีจะให้
      this.username = ''; //เซตให้เป็นค่าว่างก่อน
      return;
    }

    const user: User = JSON.parse(userString);
    // this.username = `${user.username} ${user.userId}`;
    this.username = user.username;
  }
}

export interface User {
  userId: string;
  username: string;
  // firstName: string;
  // lastName: string;
  roleListId: string;
  roleNameList: Role[];
  menuList: any[];
  token: string;
  expiresIn: number;
}

export interface Role {
  name: string;
  roleId: string;
}
