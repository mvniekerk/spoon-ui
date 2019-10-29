import './progression.scss';
import React from 'react';
import CheckRounded from '@material-ui/icons/CheckRounded';

export interface IProgressionProps {
  done: boolean;
  current: boolean;
  step: number;
  icon?: JSX.Element;
  onClick?: () => void;
  vertical?: boolean;
  displayLine?: boolean;
  lineBefore?: boolean;
  lineAfter?: boolean;
}

export default class ProgressionItem extends React.Component<IProgressionProps> {
  static defaultProps: IProgressionProps = {
    done: false,
    current: false,
    step: 1
  };

  render() {
    const textBelow = !this.props.vertical && (this.props.lineAfter || this.props.lineBefore);
    const counter = (
      <div className="counter">{!!this.props.icon ? this.props.icon : this.props.done ? <CheckRounded /> : this.props.step}</div>
    );
    return (
      <div
        className={`progression-item  ${this.props.done ? 'done' : ''} ${this.props.current ? 'current' : ''} ${
          textBelow ? 'line-below' : ''
        }`}
        onClick={this.props.onClick}
      >
        {counter}
        <div className="progression-text">{this.props.children}</div>
      </div>
    );
  }
}
