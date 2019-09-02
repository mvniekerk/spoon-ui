import './combobox-input.scss';
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
import { Dropdown } from '../dropdown/dropdown';
import { IRadioInputProps } from './radio-input';
import { ITranslatedSelectableValue } from '../../util';
import { IDropdownItem } from '../dropdown/dropdown-item';

export interface IComboboxInputProps<T> extends ISelectableFormInput<T> {
  search?: boolean;
  required?: boolean;
}

export class ComboboxInput<T> extends React.Component<IComboboxInputProps<T>, ISelectableFormInputState<T>> {
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
    const onChange = (t: ITranslatedSelectableValue<T>) => {
      this.props.onChange(t.value);
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const onClose = () => {
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const choices: Array<IDropdownItem<T>> = this.state.choices.map(b => b as IDropdownItem<T>);
    const input = (
      <Dropdown
        {...this.props}
        initialValues={choices}
        onValueSelected={onChange}
        unselectable={false}
        onClose={onClose}
        disabled={this.props.disabled}
      />
    );
    return formInputGroup(this, input, this.props.required);
  }
}
