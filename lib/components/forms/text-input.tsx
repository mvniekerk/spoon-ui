import './text-input.scss';
import React, { ChangeEvent } from 'react';
import { IDirtyInput } from '../../util/dirty-input';
import { translateItem, TranslatedValueOrKey, ITranslatedValue } from '../../util/translation';
import { validationErrors } from '../../validation/validate';
import { FormGroup, Input, Label } from 'reactstrap';
import { FormHelp, FormValid } from '../form-error/form-error';

import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';

interface ITextInputState {
  valid: boolean;
  errors: Array<ITranslatedValue<string>>;
}

export interface ITextInputProps extends IDirtyInput<string> {
  label?: TranslatedValueOrKey<string>;
  id: string;
  placeHolder: TranslatedValueOrKey<string>;
  value: string;
  checkmark?: boolean;
}

export class TextInput extends React.Component<ITextInputProps, ITextInputState> {
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
      this.setState({ valid: false, errors: [] });
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
    const isInvalid = this.props.dirty && !this.state.valid;
    const isValid = this.props.dirty && this.state.valid;
    return (
      <FormGroup className={`${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''}`} valid>
        {!!this.props.label && <Label for={this.props.id}>{translateItem(this.props.label)}</Label>}
        <div className="input-group">
          <Input
            id={this.props.id}
            placeholder={translateItem(this.props.placeHolder)}
            value={this.props.value}
            onChange={onChange}
            onBlur={this.props.onMadeDirty}
            valid
          />
          {isInvalid && <Clear className="material-icons invalid-icon" />}
          {isValid && <Check className="material-icons valid-icon" />}
          {isValid && !!this.props.validMessage && <FormValid {...this.props} />}
          {!isValid && !isInvalid && !!this.props.helpMessage && <FormHelp helpMessage={this.props.helpMessage} />}
        </div>
      </FormGroup>
    );
  }
}
