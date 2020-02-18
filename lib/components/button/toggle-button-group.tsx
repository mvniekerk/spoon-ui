import React from 'react';
import { Button } from './button';
import { Row } from 'reactstrap';
import { ITranslatedValue, translateItem } from '../../util/translation';

export interface IToggleButtonGroupProps<T> {
  values: Array<ITranslatedValue<T>>;
  onChanged?: (value: any) => void;
}

export interface IToggleButtonGroupState {
  toggleId: number;
}

export class ToggleButtonGroup<T> extends React.Component<IToggleButtonGroupProps<T>, IToggleButtonGroupState> {
  static defaultProps: IToggleButtonGroupProps<any> = {
    values: []
  };

  state: IToggleButtonGroupState = {
    toggleId: undefined
  };

  onBtnClick = selected => {
    this.setState({ toggleId: selected });
    if (!!this.props.onChanged) {
      this.props.onChanged(selected);
    }
  };

  render() {
    return (
      <Row>
        {this.props.values.map((v, index) => (
          // tslint:disable:jsx-no-lambda
          <Button className="toggle-btn" key={index} active={this.state.toggleId === index} onClick={() => this.onBtnClick(index)}>
            {translateItem(v.value)}
          </Button>
        ))}
      </Row>
    );
  }
}
