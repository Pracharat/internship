export interface ScreenBreakpoint {
  xSmall: boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
  xLarge: boolean;
  xxLarge: boolean;
}

export enum ScreenBreakpoints {
  XSmall = '(min-width: 320px)',
  Small = '(min-width: 480px)',
  Medium = '(min-width: 768px)',
  Large = '(min-width: 1024px)',
  XLarge = '(min-width: 1440px)',
  XXLarge = '(min-width: 1920px)',
}
