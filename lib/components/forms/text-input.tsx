import React, { ChangeEvent } from 'react';
import { IDirtyInput } from '../../util/dirty-input';
import { ITextTranslationAndValue, translateItem } from '../dropdown';
import { validationErrors } from '../../validation/validate';
import { Input } from 'reactstrap';

interface ITextInputState {
  valid: boolean;
  errors: Array<ITextTranslationAndValue<string>>;
}

export interface ITextInputProps extends IDirtyInput<string> {
  label: ITextTranslationAndValue<string>;
  id: string;
  placeHolder: ITextTranslationAndValue<string>;
  value: string;
  checkmarks?: boolean;
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
    return (
      <Input
        id={this.props.id}
        placeholder={translateItem(this.props.placeHolder)}
        value={this.props.value}
        onChange={onChange}
        invalid={!this.state.valid}
      />
    );
  }
}
