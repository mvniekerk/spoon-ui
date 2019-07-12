import './progression.scss';
import React from 'react';

export interface IProgression {
  vertical: boolean;
}

export default class Progression extends React.Component<IProgression> {
  defaultProps: IProgression = {
    vertical: false
  };

  render() {
    return <div className={`progression ${this.props.vertical ? 'vertical' : ''}`}>{this.props.children}</div>;
  }
}
