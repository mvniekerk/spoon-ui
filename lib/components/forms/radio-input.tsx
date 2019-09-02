import './radio-input.scss';
import './form-input.scss';
import React from 'react';
import {
  checkValidAndErrorState,
  defaultStateForSelectableFormInput,
  formInputGroup,
  handleSelectableFormDidUpdate,
  ISelectableFormInput,
  ISelectableFormInputState
} from './form-input';
import { RadioGroup } from '../selection/radiogroup';

export interface IRadioInputProps<T> extends ISelectableFormInput<T> {
  xs?: number;
  md?: number;
  lg?: number;
  vertical?: boolean;
  required?: boolean;
}

export class RadioInput<T> extends React.Component<IRadioInputProps<T>, ISelectableFormInputState<T>> {
  constructor(props) {
    super(props);
    this.state = defaultStateForSelectableFormInput<T>(this.props);
  }

  componentDidMount() {
    checkValidAndErrorState(this);
  }

  componentDidUpdate(prevProps: Readonly<IRadioInputProps<T>>, prevState: Readonly<ISelectableFormInputState<T>>, snapshot?: any) {
    handleSelectableFormDidUpdate(this, prevProps, prevState);
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
        disabled={this.props.disabled}
      />
    );
    return formInputGroup(this, inputs, this.props.required);
  }
}
