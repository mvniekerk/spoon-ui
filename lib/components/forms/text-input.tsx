import './text-input.scss';
import React, { ChangeEvent } from 'react';
import { IDirtyInput } from '../../util/dirty-input';
import { translateItem } from '../../util/translation';
import { Input } from 'reactstrap';

import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import {
  IFormInput,
  IFormInputState,
  checkValidAndErrorState,
  handleFormDidUpdate,
  defaultFormInputState,
  FormInputGroup
} from './form-input';

export interface ITextInputProps extends IDirtyInput<string>, IFormInput<string> {
  check?: boolean;
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
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.props.onChange(e.target.value);
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const isInvalid = this.state.invalidAndDirty;
    const isValid = this.state.validAndDirty;
    return (
      <FormInputGroup {...this.props}>
        <Input
          id={this.props.id}
          placeholder={translateItem(this.props.placeholder)}
          value={this.props.value}
          onChange={onChange}
          onBlur={this.props.onMadeDirty}
          valid={this.state.validAndDirty}
          invalid={this.state.invalidAndDirty}
        />
        {isInvalid && this.props.check && <Clear id="clear" className="material-icons invalid-icon" />}
        {isValid && this.props.check && <Check id="check" className="material-icons valid-icon" />}
      </FormInputGroup>
    );
  }
}
