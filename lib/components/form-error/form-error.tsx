import React from 'react';
import { FormFeedback } from 'reactstrap';
import Cancel from '@material-ui/icons/Cancel';
import { ITextTranslationAndValue } from '../dropdown/text-translation-and-value';
import { translateItem } from '../../components/dropdown/dropdown-item';

export interface IFormErrorProps {
  errors: Array<ITextTranslationAndValue<string>>;
}

export class FormError extends React.Component<IFormErrorProps> {
  render() {
    const error = !!this.props.errors ? translateItem(this.props.errors[0]) : null;
    return (
      <>
        {!!error && (
          <FormFeedback invalid>
            <Cancel className="material-icons" />
            {error}
          </FormFeedback>
        )}
      </>
    );
  }
}
