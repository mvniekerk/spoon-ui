import './progression.scss';
import React from 'react';

export default class Progression extends React.Component {
  render() {
    return <div className="progression">{this.props.children}</div>;
  }
}
