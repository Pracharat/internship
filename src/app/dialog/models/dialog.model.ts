export interface DialogParams<T = any> {
  title?: string;
  content: string;
  data?: T;
  buttons?: DialogButtons;
}

export interface DialogButtons {
  closeText?: string;
  yesText?: string;
  noText?: string;
}
