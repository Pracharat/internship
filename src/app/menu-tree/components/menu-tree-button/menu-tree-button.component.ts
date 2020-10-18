import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';

import { UtilityService } from '@app-services/common/utility.service';

import { MenuItem } from '@app-models/common/menu-tree.model';

@Component({
  selector: 'app-menu-tree-button',
  templateUrl: './menu-tree-button.component.html',
  styleUrls: ['./menu-tree-button.component.scss']
})
export class MenuTreeButtonComponent implements OnInit {

  @Output() selectMenu = new EventEmitter();

  @Input() menu: MenuItem;
  get text(): string {
    return this.menu.text;
  }
  get routerLink(): string | string[] {
    return this.menu.routerLink;
  }
  get routerLinkActive(): string {
    return 'active';
  }
  get subMenu(): MenuItem[] {
    return this.menu.children instanceof Array ? this.menu.children : [];
  }

  get hasLink(): boolean {
    return !UtilityService.isNullOrUndefined(this.menu.routerLink) ||
      (this.menu.routerLink instanceof Array && this.menu.routerLink.length > 0);
  }
  get hasSubMenu(): boolean {
    return this.menu.children instanceof Array;
  }
  get isExpand(): boolean {
    return this.menu.isExpand;
  }
  get hasIcon(): boolean {
    return !!this.menu.matIcon ||
      (
        !UtilityService.isNullOrUndefined(this.menu.faIcon) ||
        (this.menu.faIcon instanceof Array && this.menu.faIcon.length > 0)
      ) ||
      (
        !UtilityService.isNullOrUndefined(this.menu.faStackIcon) ||
        (this.menu.faStackIcon instanceof Array && this.menu.faStackIcon.length > 0)
      );

  }

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.expandOnInit();
  }

  toggle() {
    this.menu.isExpand = !this.menu.isExpand;
  }

  onClickMenu() {
    this.menu.isExpand = true;
    this.selectMenu.emit();
  }

  private expandOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const { urlAfterRedirects, url } = event;
        return urlAfterRedirects || url;
      }),
      take(1),
    ).subscribe(url => {
      const currentUrl: string = this.routerLink instanceof Array ? `/${this.routerLink.join('/')}` : this.routerLink;
      if (url === currentUrl) {
        this.menu.isExpand = true;
        this.selectMenu.emit();
      }
    });
  }

}
