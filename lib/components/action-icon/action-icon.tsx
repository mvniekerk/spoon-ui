import React, { HTMLAttributes, ReactNode } from 'react';
import './action-icon.scss';

interface IActionIconProps extends HTMLAttributes<{}> {
  icon: ReactNode;
}

export class ActionIcon extends React.Component<IActionIconProps> {
  render() {
    const { icon, className, ...rest } = this.props;
    return (
      <span className={`action-icon${className ? ' ' + className : ''}`} {...rest}>
        {icon}
      </span>
    );
  }
}
