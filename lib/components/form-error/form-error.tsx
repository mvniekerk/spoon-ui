import React from 'react';
import { FormFeedback } from 'reactstrap';
import Cancel from '@material-ui/icons/Cancel';
import Info from '@material-ui/icons/Info';
import { ITextTranslationAndValue, translateItem } from '../../util/translation';

export interface IFormErrorProps {
  errors: Array<ITextTranslationAndValue<string>>;
}

export const FormError = (props: IFormErrorProps) => (
  <>
    {!!props.errors && (
      <FormFeedback invalid>
        <Cancel className="material-icons" />
        {translateItem(props.errors[0])}
      </FormFeedback>
    )}
  </>
);

export interface IFormValidProps {
  validMessage?: ITextTranslationAndValue<string>;
}

export const FormValid = (props: IFormValidProps) => (
  <>
    {!!props.validMessage && (
      <FormFeedback valid>
        <Info className="material-icons" />
        {translateItem(props.validMessage)}
      </FormFeedback>
    )}
  </>
);
