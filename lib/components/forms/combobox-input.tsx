import React from 'react';
import {
  checkValidAndErrorState,
  defaultStateForSelectableFormInput,
  formInputGroup,
  handleFormDidUpdate,
  ISelectableFormInput,
  ISelectableFormInputState
} from './form-input';
import { Dropdown } from '../dropdown/dropdown';
import { IRadioInputProps } from './radio-input';
import { ITranslatedSelectableValue } from '../../util';

export interface IComboboxInputProps<T> extends ISelectableFormInput<T> {
  search?: boolean;
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
    handleFormDidUpdate(this, prevProps, prevState);
  }

  render() {
    const onChange = (t: ITranslatedSelectableValue<T>) => {
      this.props.onChange(t.value);
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const input = <Dropdown {...this.props} onValueDeselected={onChange} />;
    return formInputGroup<T>(this, input);
  }
}
