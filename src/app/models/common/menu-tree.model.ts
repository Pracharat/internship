export interface MenuItem {
  text: string;
  isExpand?: boolean;
  routerLink?: string | string[];
  faIcon?: string | string[];
  faStackIcon?: {
    faIcon: string | string[];
    size?: string;
  }[];
  matIcon?: string;
  children?: MenuItem[];
}
