import './progression.scss';
import React from 'react';
import { CheckRounded } from '@material-ui/icons';

export interface IProgressionProps {
  done: boolean;
  current: boolean;
  step: number;
}

export default class ProgressionItem extends React.Component<IProgressionProps> {
  static defaultProps: IProgressionProps = {
    done: false,
    current: false,
    step: 1
  };

  render() {
    const counter = this.props.done ? (
      <div className="counter">
        <CheckRounded />
      </div>
    ) : (
      <div className="counter">{this.props.step}</div>
    );
    return (
      <div className={`progression-item  ${this.props.done ? 'done' : ''} ${this.props.current ? 'current' : ''}`}>
        {counter}
        <div className="progression-text">{this.props.children}</div>
      </div>
    );
  }
}
