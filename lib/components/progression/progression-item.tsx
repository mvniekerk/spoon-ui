import './progression.scss';
import React from 'react';
import { CheckRounded } from '@material-ui/icons';

export interface IProgressionProps {
  done: boolean;
  current: boolean;
  step: number;
  icon?: JSX.Element;
  onClick?: () => void;
}

export default class ProgressionItem extends React.Component<IProgressionProps> {
  static defaultProps: IProgressionProps = {
    done: false,
    current: false,
    step: 1
  };

  render() {
    const counter = (
      <div className="counter">{!!this.props.icon ? this.props.icon : this.props.done ? <CheckRounded /> : this.props.step}</div>
    );
    return (
      <div
        className={`progression-item  ${this.props.done ? 'done' : ''} ${this.props.current ? 'current' : ''}`}
        onClick={this.props.onClick}
      >
        {counter}
        <div className="progression-text">{this.props.children}</div>
      </div>
    );
  }
}
