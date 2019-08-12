import React from 'react';
import {
  checkValidAndErrorState,
  defaultFormInputState,
  formInputGroup,
  handleFormDidUpdate,
  IFormInput,
  IFormInputState,
  ISelectableFormInputState
} from './form-input';
import { ITranslatedSelectableValue } from '../../util';
import { IDropdownItem } from '../dropdown/dropdown-item';
import { Dropdown } from '../dropdown';
import { validationErrors } from '../..//validation';

export interface IMultipleSelectionInputProps<T> extends IFormInput<T[]> {
  choices: () => Map<T, string>;
  search?: boolean;
  selectionBar?: boolean;
}

export class MultipleSelectionInput<T> extends React.Component<IMultipleSelectionInputProps<T>, ISelectableFormInputState<T[]>> {
  componentDidMount() {
    if (this.props.dirty) {
      const errors = validationErrors(this.props.value, this.props.validation);
      const valid = errors.length === 0;
      this.setState({ valid, errors });
    } else {
      this.setState({ valid: false, errors: [] });
    }
  }

  componentDidUpdate(
    prevProps: Readonly<IMultipleSelectionInputProps<T>>,
    prevState: Readonly<IFormInputState<T[]>>,
    snapshot?: any
  ): void {
    handleFormDidUpdate(this, prevProps, prevState);
  }

  constructor(props: IMultipleSelectionInputProps<T>) {
    super(props);

    const choiceVals = props.choices();
    const choices: Array<ITranslatedSelectableValue<T[]>> = !!choiceVals
      ? Array.from(choiceVals.keys()).map(k => ({
          name: choiceVals.get(k),
          display: choiceVals.get(k),
          id: `${props.id}_${choiceVals.get(k)}`,
          value: [k],
          disabled: false,
          selected: false,
          groupName: props.id
        }))
      : [];
    this.state = { ...defaultFormInputState<T[]>(), choices };
  }

  render() {
    const onChange = (t: Array<ITranslatedSelectableValue<T>>) => {
      this.props.onChange(t.map(b => b.value));
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const onClose = () => {
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const choices: Array<IDropdownItem<T[]>> = this.state.choices.map(b => b as IDropdownItem<T[]>);
    const input = <Dropdown {...this.props} initialValues={choices} multiple onClose={onClose} onSelectionChanged={onChange} />;
    return formInputGroup(this, input);
  }
}
