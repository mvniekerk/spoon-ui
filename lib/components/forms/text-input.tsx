import React, { ChangeEvent } from 'react';
import { IDirtyInput } from '../../util/dirty-input';
import { ITextTranslationAndValue, translateItem, TranslatedValueOrKey } from '../../util/translation';
import { validationErrors } from '../../validation/validate';
import { Input, InputGroup, Label } from 'reactstrap';
import { FormError, FormValid } from '../form-error/form-error';

import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';

interface ITextInputState {
  valid: boolean;
  errors: Array<ITextTranslationAndValue<string>>;
}

export interface ITextInputProps extends IDirtyInput<string> {
  label: TranslatedValueOrKey<string>;
  id: string;
  placeHolder: TranslatedValueOrKey<string>;
  value: string;
  checkmark?: boolean;
}

class TextInputComponent extends React.Component<ITextInputProps, ITextInputState> {
  state: ITextInputState = {
    valid: true,
    errors: []
  };

  constructor(props) {
    super(props);
  }

  checkValidAndErrorState() {
    if (this.props.dirty) {
      const errors = validationErrors(this.props.value, this.props.validation);
      const valid = errors.length === 0;
      this.setState({ valid, errors });
    } else {
      this.setState({ valid: true, errors: [] });
    }
  }

  componentDidMount() {
    this.checkValidAndErrorState();
  }

  componentDidUpdate(prevProps: Readonly<ITextInputProps>, prevState: Readonly<ITextInputState>, snapshot?: any) {
    if (this.props.dirty !== prevProps.dirty || (this.props.dirty && this.props.value !== prevProps.value)) {
      this.checkValidAndErrorState();
    }
  }

  render() {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.props.onChange(e.target.value);
      if (!!this.props.onMadeDirty) {
        this.props.onMadeDirty();
      }
    };
    const isInvalid = this.state.valid ? '' : 'is-invalid';
    const isValid = this.state.valid ? 'is-valid' : '';
    return (
      <InputGroup className={`${isInvalid} ${isValid} input-group-icon-left`}>
        <Label for={this.props.id}>{translateItem(this.props.label)}</Label>
        <Input
          id={this.props.id}
          placeholder={translateItem(this.props.placeHolder)}
          value={this.props.value}
          onChange={onChange}
          invalid={!this.state.valid}
          onBlur={this.props.onMadeDirty}
          valid={this.props.dirty && this.state.valid}
        />
        {this.props.dirty && !this.state.valid && <Clear className="material-icons invalid-icon" />}
        {this.props.dirty && this.state.valid && <Check className="material-icons valid-icon" />}
        {this.props.dirty && !this.state.valid && <FormError errors={this.state.errors} />}
        {this.props.dirty && this.state.valid && !!this.props.validMessage && <FormValid {...this.props} />}
      </InputGroup>
    );
  }
}
