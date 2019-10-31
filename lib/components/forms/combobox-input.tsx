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
    const { onChange, onMadeDirty, required, disabled, ...other } = this.props;
    const handleChange = (t: ITranslatedSelectableValue<T>) => {
      onChange(t.value);
      if (!!onMadeDirty) {
        onMadeDirty();
      }
    };
    const onClose = () => {
      if (!!onMadeDirty) {
        onMadeDirty();
      }
    };
    const choices: Array<IDropdownItem<T>> = this.state.choices.map(b => b as IDropdownItem<T>);
    const input = (
      <Dropdown
        {...other}
        initialValues={choices}
        onValueSelected={handleChange}
        unselectable="off"
        onClose={onClose}
        disabled={disabled}
      />
    );
    return formInputGroup(this, input, required);
  }
}
