import React, { HTMLAttributes, ReactNode } from 'react';
import './action-icon.scss';

interface IActionIconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: ReactNode;
}

export class ActionIcon extends React.Component<IActionIconProps> {
  render() {
    const { icon, className, ...htmlAttrs } = this.props;
    return (
      <span className={`action-icon${className ? ' ' + className : ''}`} {...htmlAttrs}>
        {icon}
      </span>
    );
  }
}
