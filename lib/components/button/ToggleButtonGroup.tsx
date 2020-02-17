import React from 'react';
import { Button } from './button';
import { Row } from 'reactstrap';

export interface IToggleButtonGroupProps {
  values: Array<string>;
}

export interface IToggleButtonGroupState {
  toggleId: number;
}

export class ToggleButtonGroup extends React.Component<IToggleButtonGroupProps, IToggleButtonGroupState> {
  static defaultProps: IToggleButtonGroupProps = {
    values: []
  };

  state: IToggleButtonGroupState = {
    toggleId: undefined
  };

  onCheckboxBtnClick = selected => {
    this.setState({ toggleId: selected });
  };

  render() {
    return (
      <Row>
        {this.props.values.map((v, index) => (
          <Button className="toggle-btn" key={index} active={this.state.toggleId === index} onClick={() => this.onCheckboxBtnClick(index)}>
            {v}
          </Button>
        ))}
      </Row>
    );
  }
}
