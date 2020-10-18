import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, debounceTime, filter } from 'rxjs/operators';

import { AppSettings } from 'src/app/app-settings';
import { ScreenDetector } from './screen-detector.service';

import { MainMenuMode } from '@app-models/common/main-menu.model';
import { ScreenBreakpoint } from '@app-models/common/screen.model';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  private screenChangeDebounceTime = AppSettings.screenChangeDebounceTime;

  private screen$: Observable<ScreenBreakpoint>;
  isDisplayMenuButton$: Observable<boolean>;

  mode$: Observable<MainMenuMode>;

  routerEvent$: Observable<string>;
  private hideMenuOnRouteList: string[] = AppSettings.hideMenuOnRoutes;
  private hideMenuOnRoutesBh$ = new BehaviorSubject<boolean>(false);

  private opened = false;
  private openedBh$ = new BehaviorSubject<boolean>(this.opened);
  opened$: Observable<boolean>;

  constructor(
    private screenDetector: ScreenDetector,
    private router: Router,
  ) {
    this.initMenu();
    this.hideMenuOnRoutes();
  }

  private initMenu() {
    this.screen$ = this.screenDetector.screenSize$.asObservable();

    this.isDisplayMenuButton$ = this.screen$.pipe(
      debounceTime(this.screenChangeDebounceTime),
      map(screenBreakpoints => {
        return Object
          .keys(screenBreakpoints)
          .filter(breakpoint => screenBreakpoints[breakpoint])
          .slice(-1)[0];
      }),
      map(matchedBreakpoint => AppSettings.displayMenuButton[matchedBreakpoint] || !matchedBreakpoint),
    );

    this.mode$ = this.isDisplayMenuButton$.pipe(
      map(isDisplayMenuButton => {
        return isDisplayMenuButton ? MainMenuMode.Over : MainMenuMode.Side;
      }),
    );

    this.routerEvent$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const { url, urlAfterRedirects} = event;
        return urlAfterRedirects || url;
      }),
    );

    this.opened$ = combineLatest([
      this.openedBh$.asObservable(),
      this.isDisplayMenuButton$,
      this.hideMenuOnRoutesBh$.asObservable(),
    ]).pipe(
      map(([opened, isDisplayMenuButton, hideMenuOnRoutes]) => {
        return (!isDisplayMenuButton || opened) && !hideMenuOnRoutes;
      }),
    );

    this.setMenuOpenOnNoDisplayToggleButton();
  }

  toggleMenu() {
    this.setMenuState(!this.opened);
  }

  setMenuState(isOpened: boolean) {
    this.opened = isOpened;
    this.openedBh$.next(this.opened);
  }

  private setMenuOpenOnNoDisplayToggleButton() {
    this.isDisplayMenuButton$.subscribe(isDisplayMenuButton => {
      this.setMenuState(!isDisplayMenuButton);
    });
  }

  private hideMenuOnRoutes() {
    this.routerEvent$.pipe(
      map((url) => {
        const isMatched: boolean = !!this.hideMenuOnRouteList.find(route => route === url);
        return isMatched;
      }),
    ).subscribe(isHideOnRoute => {
      this.hideMenuOnRoutesBh$.next(isHideOnRoute);
    });
  }

}
