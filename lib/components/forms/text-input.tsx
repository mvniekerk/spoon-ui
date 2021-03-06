import './form-input.scss';
import React, { ChangeEvent } from 'react';
import cx from 'classnames';
import { IDirtyInput } from '../../util/dirty-input';
import { translateItem } from '../../util/translation';
import { Input, InputProps, Label } from 'reactstrap';

import Check from '@material-ui/icons/CheckRounded';
import ClearIcon from '@material-ui/icons/Clear';
import {
  IFormInput,
  IFormInputState,
  checkValidAndErrorState,
  handleFormDidUpdate,
  defaultFormInputState,
  formInputGroup
} from './form-input';

export interface ITextInputProps extends Omit<InputProps, 'value' | 'onChange' | 'placeholder'>, IDirtyInput<string>, IFormInput<string> {
  enableTicks?: boolean;
  required?: boolean;
}

export class TextInput extends React.Component<ITextInputProps, IFormInputState<string>> {
  state: IFormInputState<string> = defaultFormInputState<string>();

  componentDidMount() {
    checkValidAndErrorState(this);
  }

  componentDidUpdate(prevProps: Readonly<ITextInputProps>, prevState: Readonly<IFormInputState<string>>, snapshot?: any) {
    handleFormDidUpdate(this, prevProps, prevState);
  }

  render() {
    const { id, label, className, onMadeDirty, onChange, placeholder, value, required, disabled, enableTicks, ...other } = this.props;

    const onChangeDirty = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      if (!!onMadeDirty) {
        onMadeDirty();
      }
    };
    const isInvalid = this.state.valid;
    const isValid = this.state.valid;
    const input = (
      <>
        <Input
          id={id}
          placeholder={translateItem(placeholder)}
          value={value}
          onChange={onChangeDirty}
          onBlur={onMadeDirty}
          validAndDirty={isValid}
          invalid={isInvalid}
          className={cx(className, { required })}
          disabled={disabled}
          {...other}
        />
        {isInvalid && enableTicks && <ClearIcon id="clear" className={`material-icons invalid-icon disabled-${disabled}`} />}
        {isValid && enableTicks && <Check id="check" className={`material-icons valid-icon disabled-${disabled}`} />}
      </>
    );
    return (
      <>
        {this.props.label && <Label>{translateItem(this.props.label)}</Label>}
        {formInputGroup(this, input, this.props.required)}
      </>
    );
  }
}
