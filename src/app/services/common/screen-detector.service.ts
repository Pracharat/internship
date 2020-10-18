import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ScreenBreakpoints, ScreenBreakpoint } from '@app-models/common/screen.model';

@Injectable({
  providedIn: 'root'
})
export class ScreenDetector {

  private breakpoints: ScreenBreakpoints[] = [
    ScreenBreakpoints.XSmall,
    ScreenBreakpoints.Small,
    ScreenBreakpoints.Medium,
    ScreenBreakpoints.Large,
    ScreenBreakpoints.XLarge,
    ScreenBreakpoints.XXLarge,
  ];

  screenSize$ = new BehaviorSubject<ScreenBreakpoint>({
    xSmall: false,
    small: false,
    medium: false,
    large: false,
    xLarge: false,
    xxLarge: false,
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe(this.breakpoints).pipe(
      map((state: BreakpointState) => {
        const { breakpoints } = state;
        const xSmall = breakpoints[ScreenBreakpoints.XSmall];
        const small = breakpoints[ScreenBreakpoints.Small];
        const medium = breakpoints[ScreenBreakpoints.Medium];
        const large = breakpoints[ScreenBreakpoints.Large];
        const xLarge = breakpoints[ScreenBreakpoints.XLarge];
        const xxLarge = breakpoints[ScreenBreakpoints.XXLarge];
        return { xSmall, small, medium, large, xLarge, xxLarge } as ScreenBreakpoint;
      }),
    ).subscribe(screenSize => {
      this.screenSize$.next(screenSize);
    });
  }
}
