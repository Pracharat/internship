import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import { ToggleMenuService } from '@app-services/common/toggle-menu.service';

import { MenuItem } from '@app-models/common/menu-tree.model';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  menus: MenuItem[] = [];
  constructor(
    private menuService: ToggleMenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menus = [];
    this.menu();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(
      event => {
        this.getmenuFormLocalstorage();
      }
    );
  }
  private getmenuFormLocalstorage() {
    const menuListString = JSON.parse(localStorage.getItem('menulistitem'));

    if (!menuListString) {
      this.menus = [];
      return;
    }
    // const menuList: menulist = JSON.parse(menuListString);
    this.menus = menuListString;
  }
  onSelectMenu() {
    this.menuService.toggleMenu();
  }

  menu() {
    // this.menuListService.getMenu().subscribe(
    //   (menuList: any) => {

    //     // ค่าที่จะเอามาใช้เป็นเมนูย่อยมันอยู่ใน menuList.resultData
    //     this.menus = menuList.resultData;
    //   }
    // );
    // const userLogin = JSON.parse(localStorage.getItem('login'));
    // this.menus = userLogin.menuList;

    const menu = JSON.parse(localStorage.getItem('menulistitem'));
    this.menus = menu;
  }
}
export interface menulist {
  resultCode?: string;
  developerMessage?: string;
  userMessage?: string;
  moreInfo?: string;
  userId?: string;
  username?: string;
  name?: string;
  roleId?: string;
  text?: string;
  routerLink?: string;
  menuId?: string;
}
