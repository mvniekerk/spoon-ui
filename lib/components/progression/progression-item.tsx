import './progression.scss';
import React from 'react';
import CheckRounded from '@material-ui/icons/CheckRounded';
import Edit from '@material-ui/icons/Edit';

export interface IProgressionProps {
  done: boolean;
  current: boolean;
  step: number;
  disabled?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
}

export class ProgressionItem extends React.Component<IProgressionProps> {
  static defaultProps: IProgressionProps = {
    done: false,
    current: false,
    step: 1
  };

  render() {
    const counter = (
      <div className="counter">
        {!!this.props.icon ? this.props.icon : this.props.done ? <CheckRounded /> : this.props.current ? <Edit /> : this.props.step}
      </div>
    );
    return (
      <div
        className={`progression-item  ${this.props.done ? 'done' : ''} ${this.props.disabled ? 'disabled' : ''} ${
          this.props.current ? 'current' : ''
        }`}
        onClick={this.props.onClick}
      >
        <div className="progression-line-top" />
        <div className="progression-line-bottom" />
        {counter}
        <div className="progression-text">{this.props.children}</div>
      </div>
    );
  }
}
