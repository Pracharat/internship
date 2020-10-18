export interface DialogParams {
  title?: string;
  content?: string;
  data?: any;
  buttons?: DialogButtons;
  alertType?: DialogAlertType;
}

export interface DialogButtons {
  closeText?: string;
  yesText?: string;
  noText?: string;
}

export enum Dialog {
  Alert = 'alert',
  Confirm = 'confirm',
}

export enum DialogAlertType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
  Delete = 'delete',
}

