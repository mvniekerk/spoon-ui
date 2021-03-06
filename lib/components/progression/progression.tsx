import './progression.scss';
import React from 'react';

export interface IProgression {
  vertical: boolean;
}

export class Progression extends React.Component<IProgression> {
  static defaultProps: IProgression = {
    vertical: false
  };

  render() {
    return <div className={`progression ${this.props.vertical ? 'vertical' : ''}`}>{this.props.children}</div>;
  }
}
