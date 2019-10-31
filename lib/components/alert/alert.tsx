import './alert.scss';

import React from 'react';
import { UncontrolledAlert, UncontrolledAlertProps } from 'reactstrap';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';
import Error from '@material-ui/icons/Error';

export interface IAlertProp extends UncontrolledAlertProps {
  color: string;
  icon?: 'info' | 'warning' | 'error';
}

type Icon = Pick<IAlertProp, 'icon'>;

export class Alert extends React.Component<IAlertProp> {
  InfoIcon = (icon: Icon) => icon === 'info' && <Info className="alert-icon" />;
  WarningIcon = (icon: Icon) => icon === 'warning' && <Warning className="alert-icon" />;
  ErrorIcon = (icon: Icon) => icon === 'error' && <Error className="alert-icon" />;

  render() {
    const { color, icon, children, ...other } = this.props;
    return (
      <UncontrolledAlert color={color} {...other}>
        <this.InfoIcon icon={icon} />
        <this.WarningIcon icon={icon} />
        <this.ErrorIcon icon={icon} />
        <div className="alert-text">{children}</div>
      </UncontrolledAlert>
    );
  }
}
