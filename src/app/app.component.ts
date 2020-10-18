import { Component } from '@angular/core';
import { ToggleMenuService } from '@app-services/common/toggle-menu.service';
import { Observable } from 'rxjs';
import { MainMenuMode } from '@app-models/common/main-menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'internProject';

  mode$: Observable<MainMenuMode> = this.menuService.mode$;
  opened$: Observable<boolean> = this.menuService.opened$;

  constructor(
    private menuService: ToggleMenuService,
  ) { }

  onClickBackdrop() {
    this.menuService.setMenuState(false);
  }

}
