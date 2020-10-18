import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from '@app-models/common/menu-tree.model';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent implements OnInit {

  @Output() selectMenu = new EventEmitter();

  @Input() menus: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
  }

  onSelectMenu(menu: MenuItem) {
    menu.isExpand = true;
    this.selectMenu.emit();
  }

  toggle(menu: MenuItem) {
    menu.isExpand = !menu.isExpand;
  }

  isExpand(menu: MenuItem): boolean {
    return menu.isExpand;
  }

}
