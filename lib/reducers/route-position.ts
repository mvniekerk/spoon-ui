import { IButtonProps } from '../components/button/button';

export class CurrentRouteAndIcon {
  name: string;
  icon: JSX.Element;
  path: string;
  sideMenu?: boolean;
  header?: string;
  breadCrumb?: CurrentRouteAndIcon[];
  actions?: IButtonProps[];
}
