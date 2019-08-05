import './radio-input.scss';
import React from 'react';
import {
  checkValidAndErrorState,
  defaultFormInputState,
  formInputGroup,
  handleFormDidUpdate,
  IFormInputState,
  ISelectableFormInput
} from './form-input';
import { ITranslatedSelectableValue } from '../../util';
import { RadioGroup } from '../selection/radiogroup';

interface IRadioInputState<T> extends IFormInputState<T> {
  choices: Array<ITranslatedSelectableValue<T>>;
}

export interface IRadioInputProps<T> extends ISelectableFormInput<T> {
  xs?: number;
  md?: number;
  lg?: number;
  vertical?: boolean;
}

export class RadioInput<T> extends React.Component<IRadioInputProps<T>, IRadioInputState<T>> {
  constructor(props) {
    super(props);
    const choiceVals = this.props.choices();
    const choices: Array<ITranslatedSelectableValue<T>> = !!choiceVals
      ? Array.from(choiceVals.keys()).map(k => ({
          name: choiceVals.get(k),
          display: choiceVals.get(k),
          id: `${this.props.id}_${choiceVals.get(k)}`,
          value: k,
          disabled: false,
          selected: false
        }))
      : [];
    this.state = { ...defaultFormInputState<T>(), choices };
  }

  componentDidMount() {
    checkValidAndErrorState(this);
  }

  componentDidUpdate(prevProps: Readonly<IRadioInputProps<T>>, prevState: Readonly<IRadioInputState<T>>, snapshot?: any) {
    handleFormDidUpdate(this, prevProps, prevState);
  }

  render() {
    const onChange = t => {
      this.props.onChange(t);
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const inputs = (
      <RadioGroup
        xs={this.props.xs}
        md={this.props.md}
        lg={this.props.lg}
        vertical={this.props.vertical}
        values={this.state.choices}
        onChanged={onChange}
        name={this.props.id}
      />
    );
    return formInputGroup<T>(this, inputs);
  }
}
