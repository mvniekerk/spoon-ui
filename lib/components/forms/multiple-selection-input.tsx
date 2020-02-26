import React from 'react';
import {
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
import { validationErrors } from '../../validation';

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
    if (this.props.choices !== prevProps.choices) {
      const choiceVals = this.props.choices();
      const choices: Array<ITranslatedSelectableValue<T[]>> = !!choiceVals
        ? Array.from(choiceVals.keys()).map(k => ({
            name: choiceVals.get(k),
            display: choiceVals.get(k),
            id: `${this.props.id}_${choiceVals.get(k)}`,
            value: [k],
            disabled: false,
            selected: this.props.selected
              ? this.props.selected.some(x => x === k)
              : this.state.choices.some(b => b.selected && b.id === `${this.props.id}_${choiceVals.get(k)}`),
            groupName: this.props.id
          }))
        : [];
      this.setState({ ...defaultFormInputState<T[]>(), choices });
    }
  }

  constructor(props: IMultipleSelectionInputProps<T>) {
    super(props);

    const choiceVals = props.choices();
    const choices: Array<ITranslatedSelectableValue<T[]>> = !!choiceVals
      ? Array.from(choiceVals.keys()).map(k => ({
          name: choiceVals.get(k),
          display: choiceVals.get(k),
          id: `${props.id}_${choiceVals.get(k)}_${k.toString()}`,
          value: [k],
          disabled: false,
          selected: props.selected && props.selected.some(x => x === k),
          groupName: props.id
        }))
      : [];
    this.state = { ...defaultFormInputState<T[]>(), choices };
  }

  render() {
    const { onChange, onMadeDirty, disabled, ...other } = this.props;
    const handleChange = (t: Array<ITranslatedSelectableValue<T[]>>) => {
      onChange(Array.prototype.concat(...t.map(b => b.value))); // Flatmap doesn't exist
      if (!!onMadeDirty) {
        onMadeDirty();
      }
    };
    const onClose = () => {
      if (!!onMadeDirty) {
        onMadeDirty();
      }
    };
    const choices: Array<IDropdownItem<T[]>> = this.state.choices.map(b => b as IDropdownItem<T[]>);
    const input = (
      <Dropdown {...other} initialValues={choices} multiple onClose={onClose} onSelectionChanged={handleChange} disabled={disabled} />
    );
    return formInputGroup(this, input);
  }
}
