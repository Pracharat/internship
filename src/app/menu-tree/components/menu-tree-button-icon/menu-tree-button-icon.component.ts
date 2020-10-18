import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '@app-services/common/utility.service';

import { MenuItem } from '@app-models/common/menu-tree.model';

@Component({
  selector: 'app-menu-tree-button-icon',
  templateUrl: './menu-tree-button-icon.component.html',
  styleUrls: ['./menu-tree-button-icon.component.scss']
})
export class MenuTreeButtonIconComponent implements OnInit {

  @Input() menu: MenuItem;

  get icon(): string | string[] {
    if (this.isFaIcon) {
      return this.menu.faIcon;
    } else if (this.isMatIcon) {
      return this.menu.matIcon;
    }
    return null;
  }
  get faStackIcon(): {
    faIcon: string | string[];
    size?: string;
  }[] {
    return this.isFaStackIcon ? this.menu.faStackIcon : [];
  }

  get isFaIcon(): boolean {
    return !UtilityService.isNullOrUndefined(this.menu.faIcon) ||
      (this.menu.faIcon instanceof Array && this.menu.faIcon.length > 0);
  }
  get isFaStackIcon(): boolean {
    return !UtilityService.isNullOrUndefined(this.menu.faStackIcon) ||
      (this.menu.faStackIcon instanceof Array && this.menu.faStackIcon.length > 0);
  }
  get isMatIcon(): boolean {
    return !!this.menu.matIcon;
  }

  constructor() { }

  ngOnInit() {
  }

}
