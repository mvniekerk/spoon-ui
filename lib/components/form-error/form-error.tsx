import React from 'react';
import { FormFeedback } from 'reactstrap';
import Cancel from '@material-ui/icons/Cancel';
import Info from '@material-ui/icons/Info';
import { ITranslatedValue, TranslatedValueOrKey, translateItem } from '../../util/translation';

export interface IFormErrorProps {
  errors: Array<ITranslatedValue<string>>;
}

export const FormError = (props: IFormErrorProps) => (
  <>
    {!!props.errors &&
      props.errors.length > 0 && (
        <FormFeedback invalid>
          <span>
            <Cancel className="material-icons" />
            {translateItem(props.errors[0])}
          </span>
        </FormFeedback>
      )}
  </>
);

export interface IFormValidProps {
  validMessage?: TranslatedValueOrKey<string>;
}

export const FormValid = (props: IFormValidProps) => (
  <>
    {!!props.validMessage && (
      <>
        <FormFeedback valid>
          <span>
            <Info className="material-icons" />
            {translateItem(props.validMessage)}
          </span>
        </FormFeedback>
      </>
    )}
  </>
);

export interface IFormHelpProps {
  helpMessage?: TranslatedValueOrKey<string>;
}

export const FormHelp = (props: IFormHelpProps) => (
  <>
    {!!props.helpMessage && (
      <FormFeedback>
        <span>
          <Info className="material-icons" />
          {translateItem(props.helpMessage)}
        </span>
      </FormFeedback>
    )}
  </>
);
