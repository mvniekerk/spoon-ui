import React from 'react';
import { ISelectableFormInput } from './form-input';
import { ITranslatedSelectableValue } from '../../util';
import { RadioGroup } from '../selection/radiogroup';
import { FormGroup, Label } from 'reactstrap';

interface IRadioInputState<T> {
  choices: Array<ITranslatedSelectableValue<T>>;
}

export class RadioInput<T> extends React.Component<ISelectableFormInput<T>, IRadioInputState<T>> {
  constructor(props) {
    super(props);
    const choices = this.props.choices();
    this.state = {
      choices: !!choices
        ? Array.from(choices.keys()).map(k => ({
            name: choices.get(k),
            display: choices.get(k),
            id: `${this.props.id}_${choices.get(k)}`,
            value: k,
            disabled: false,
            selected: false
          }))
        : []
    };
  }

  render() {
    return (
      <FormGroup style={{ width: '100%' }}>
        <Label>{this.props.label}</Label>
        <RadioGroup md={6} values={this.state.choices} onChanged={this.props.onChange} name={this.props.id} />
      </FormGroup>
    );
  }
}
