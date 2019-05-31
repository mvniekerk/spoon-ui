import './alert.scss';

import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';
import Error from '@material-ui/icons/Error';

export interface IAlertProp {
  color: string;
  icon?: 'info' | 'warning' | 'error';
}

export class Alert extends React.Component<IAlertProp> {
  InfoIcon = (props: IAlertProp) => props.icon === 'info' && <Info className="alert-icon" />;
  WarningIcon = (props: IAlertProp) => props.icon === 'warning' && <Warning className="alert-icon" />;
  ErrorIcon = (props: IAlertProp) => props.icon === 'error' && <Error className="alert-icon" />;

  render() {
    return (
      <UncontrolledAlert color={this.props.color}>
        <this.InfoIcon {...this.props} />
        <this.WarningIcon {...this.props} />
        <this.ErrorIcon {...this.props} />
        <div className="alert-text">{this.props.children}</div>
      </UncontrolledAlert>
    );
  }
}

export default Alert;
