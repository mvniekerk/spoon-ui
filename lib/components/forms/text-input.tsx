import './text-input.scss';
import React, { ChangeEvent } from 'react';
import { IDirtyInput } from '../../util/dirty-input';
import { translateItem } from '../../util/translation';
import { Input } from 'reactstrap';

import Check from '@material-ui/icons/CheckRounded';
import PriorityHighRounded from '@material-ui/icons/PriorityHighRounded';
import ArrowDropUp from '@material-ui/icons/ArrowDropUpRounded';
import {
  IFormInput,
  IFormInputState,
  checkValidAndErrorState,
  handleFormDidUpdate,
  defaultFormInputState,
  formInputGroup
} from './form-input';

export interface ITextInputProps extends IDirtyInput<string>, IFormInput<string> {
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
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.props.onChange(e.target.value);
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const isInvalid = this.state.invalidAndDirty;
    const isValid = this.state.validAndDirty;
    const input = (
      <>
        <Input
          id={this.props.id}
          placeholder={translateItem(this.props.placeholder)}
          value={this.props.value}
          onChange={onChange}
          onBlur={this.props.onMadeDirty}
          valid={this.state.validAndDirty}
          invalid={this.state.invalidAndDirty}
          className={`${this.props.required ? 'required' : ''}`}
        />
        {isInvalid && this.props.enableTicks && <PriorityHighRounded id="clear" className="material-icons invalid-icon" />}
        {isValid && this.props.enableTicks && <Check id="check" className="material-icons valid-icon" />}
        {this.props.required && (
          <div className="required-check">
            <ArrowDropUp />
          </div>
        )}
      </>
    );
    return formInputGroup(this, input);
  }
}
