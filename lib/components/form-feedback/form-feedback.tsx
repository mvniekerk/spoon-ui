import './form-feedback.scss';
import React from 'react';
import { FormFeedback } from 'reactstrap';
import Cancel from '@material-ui/icons/Cancel';
import Info from '@material-ui/icons/Info';
import { ITranslatedValue, TranslatedValueOrKey, translateItem } from '../../util/translation';

export interface IFormErrorProps<T> {
  errors: Array<ITranslatedValue<T>>;
}

export function FormError<T>(props: IFormErrorProps<T>) {
  return (
    <>
      {!!props.errors &&
        props.errors.length > 0 && (
          <FormFeedback invalid>
            <span className="form-feedback-span">
              <Cancel className="material-icons" />
              {translateItem(props.errors[0])}
            </span>
          </FormFeedback>
        )}
    </>
  );
}

export interface IFormValidProps<T> {
  validMessage?: TranslatedValueOrKey<T>;
}

export function FormValid<T>(props: IFormValidProps<T>) {
  return (
    <>
      {!!props.validMessage && (
        <>
          <FormFeedback valid>
            <span className="form-feedback-span">
              <Info className="material-icons" />
              {translateItem(props.validMessage)}
            </span>
          </FormFeedback>
        </>
      )}
    </>
  );
}

export interface IFormHelpProps<T> {
  helpMessage?: TranslatedValueOrKey<T>;
}

export function FormHelp<T>(props: IFormHelpProps<T>) {
  return (
    <>
      {!!props.helpMessage && (
        <FormFeedback invalid={false}>
          <span className="form-help form-feedback-span">
            <Info className="material-icons" />
            {translateItem(props.helpMessage)}
          </span>
        </FormFeedback>
      )}
    </>
  );
}
