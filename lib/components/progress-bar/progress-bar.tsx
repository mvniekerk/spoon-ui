import './progress-bar.scss';

import React from 'react';
import { Progress } from 'reactstrap';

export interface IProgressBarProps {
  showProgressCounter: boolean;
  label?: string;
  value: number;
  color: string;
}

export class ProgressBar extends React.Component<IProgressBarProps> {
  static defaultProps: IProgressBarProps = {
    showProgressCounter: true,
    value: 50,
    color: 'primary'
  };

  render() {
    const value = this.props.value > 0 && this.props.value <= 100 ? this.props.value : 0;
    const valueDiv = this.props.showProgressCounter && <div className="progress-value">{value}%</div>;
    const text = <div className="progress-bar-text">{this.props.label}</div>;
    const topLabel =
      this.props.label || this.props.showProgressCounter ? (
        <div className="progress-header">
          {text}
          {valueDiv}
        </div>
      ) : null;
    return (
      <div className="progress-container">
        {topLabel}
        <Progress value={this.props.value} color={this.props.color} />
      </div>
    );
  }
}

export default ProgressBar;
