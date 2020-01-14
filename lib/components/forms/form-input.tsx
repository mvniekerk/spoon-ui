import React from 'react';
import { ITranslatedSelectableValue, ITranslatedValue, TranslatedValueOrKey, translateItem } from '../../util/translation';
import { IDirtyInput } from '../../util/dirty-input';
import { IValidateAndI18nKey, validationErrors } from '../../validation/validate';
import { FormGroup, Label } from 'reactstrap';
import { FormError, FormHelp, FormValid } from '../form-feedback/form-feedback';
import ArrowDropUp from '@material-ui/icons/ArrowDropUpRounded';

export interface IValueDirtyAndValid<T> {
  value: T;
  dirty?: boolean;
  valid?: boolean;
  validation?: Array<IValidateAndI18nKey<T>>;
}

export type GetValueInObject<T, U> = (state: U) => IValueDirtyAndValid<T>;

/**
 * A form that has a label, placeholder, id, value, dirty flag, valid flag and validators
 * Use with iformInput() to create this using defaults
 */
export interface IFormInput<T> extends IDirtyInput<T> {
  label?: TranslatedValueOrKey<T>;
  placeholder?: TranslatedValueOrKey<T>;
  id?: string;
  value: T;
  disabled?: boolean;
}

/**
 * A specific IFormInput that has a map that goes betwene
 */
export interface ISelectableFormInput<T> extends IFormInput<T> {
  choices: () => Map<T, string>;
}

export interface IFormInputState<T> {
  valid: boolean;
  validAndDirty: boolean;
  invalidAndDirty: boolean;
  justHelp: boolean;
  errors: Array<ITranslatedValue<T>>;
}

export interface ISelectableFormInputState<T> extends IFormInputState<T> {
  choices: Array<ITranslatedSelectableValue<T>>;
}

export function defaultStateForSelectableFormInput<T>(
  props: ISelectableFormInput<T>,
  oldState?: ISelectableFormInputState<T>
): ISelectableFormInputState<T> {
  const choiceVals = props.choices();
  const choices: Array<ITranslatedSelectableValue<T>> = !!choiceVals
    ? Array.from(choiceVals.keys()).map(k => ({
        name: choiceVals.get(k),
        display: choiceVals.get(k),
        id: `${props.id}_${choiceVals.get(k)}`,
        value: k,
        disabled: false,
        selected: !!oldState && oldState.choices.some(b => b.selected && b.id === `${props.id}_${choiceVals.get(k)}`),
        groupName: props.id
      }))
    : [];
  return { ...defaultFormInputState<T>(), choices };
}

export function defaultFormInputState<T>(): IFormInputState<T> {
  return {
    valid: false,
    validAndDirty: false,
    invalidAndDirty: false,
    justHelp: false,
    errors: []
  };
}

export type FormInput<T> = React.Component<IFormInput<T>, IFormInputState<T>>;
export type SelectableFormInput<T> = React.Component<ISelectableFormInput<T>, ISelectableFormInputState<T>>;

export function checkValidAndErrorState<T>(form: FormInput<T>) {
  if (form.props.dirty) {
    const errors = validationErrors(form.props.value, form.props.validation);
    const valid = errors.length === 0;
    form.setState({ valid, errors });
  } else {
    form.setState({ valid: false, errors: [] });
  }
}

export function handleFormDidUpdate<T>(form: FormInput<T>, prevProps: IFormInput<T>, prevState: IFormInputState<T>) {
  if (form.props.dirty !== prevProps.dirty || (form.props.dirty && form.props.value !== prevProps.value)) {
    checkValidAndErrorState(form);
  }
  if (form.state.valid !== prevState.valid && !!form.props.onValidChange) {
    form.props.onValidChange(form.state.valid);
  }
  const isInvalid = form.props.dirty && !form.state.valid;
  const isValid = form.props.dirty && form.state.valid;
  const justHelp = !isInvalid && !isValid && !!form.props.helpMessage;
  if (form.state.invalidAndDirty !== isInvalid) {
    form.setState({ invalidAndDirty: isInvalid });
  }
  if (form.state.validAndDirty !== isValid) {
    form.setState({ validAndDirty: isValid });
  }
  if (form.state.justHelp !== justHelp) {
    form.setState({ justHelp });
  }
}

export function handleSelectableFormDidUpdate<T>(
  form: SelectableFormInput<T>,
  prevProps: ISelectableFormInput<T>,
  prevState: ISelectableFormInputState<T>
) {
  if (form.props.choices !== prevProps.choices) {
    form.setState(defaultStateForSelectableFormInput(form.props, form.state));
    if (form.props.dirty) {
      checkValidAndErrorState(form);
    }
    handleFormDidUpdate(form, prevProps, prevState);
  } else {
    handleFormDidUpdate(form, prevProps, prevState);
  }
}

export function formInputGroup(form: FormInput<any>, children: JSX.Element, required?: boolean) {
  const isInvalid = form.state.invalidAndDirty;
  const isValid = form.state.validAndDirty;
  const justHelp = form.state.justHelp;
  const className = `${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''} ${justHelp ? 'just-help' : ''}`;
  return (
    <FormGroup className={className} valid>
      <div className={`input-group ${className} form-input`}>
        {children}
        {required && (
          <div className="required-check">
            <ArrowDropUp />
          </div>
        )}
        {isValid && !!form.props.validMessage && <FormValid {...form.props} />}
        {isInvalid && <FormError errors={form.state.errors} />}
        {justHelp && !!form.props.helpMessage && <FormHelp helpMessage={form.props.helpMessage} />}
      </div>
    </FormGroup>
  );
}

function markDirty<T, U>(getValue: GetValueInObject<T, U>, component: React.Component<any, U>): () => void {
  return () => {
    const val = getValue(component.state);
    val.dirty = true;
    // @ts-ignore
    component.setState((p: U) => ({ ...p, ...val }));
  };
}

function setValue<T, U>(getValue: GetValueInObject<T, U>, component: React.Component<any, U>): (t: T) => void {
  return (value: T) => {
    const val = getValue(component.state);
    val.value = value;
    // @ts-ignore
    component.setState(p => ({ ...p, ...val }));
  };
}

function changeValid<T, U>(getValue: GetValueInObject<T, U>, component: React.Component<any, U>): (valid: boolean) => void {
  return (valid: boolean) => {
    const val = getValue(component.state);
    val.valid = valid;
    // @ts-ignore
    component.setState(p => ({ ...p, ...val }));
  };
}

export function iformInput<T, U>(
  getValue: GetValueInObject<T, U>,
  component: React.Component<any, U>,
  validation?: Array<IValidateAndI18nKey<T>>
): IFormInput<T> {
  const value = getValue(component.state);
  value.validation = validation === undefined || validation === null ? value.validation : validation;
  return {
    ...value,
    onChange: setValue(getValue, component),
    onMadeDirty: markDirty(getValue, component),
    onValidChange: changeValid(getValue, component)
  };
}

export type TestValidity = () => boolean;
export type OnChange<T> = () => T;

export function wrapChanges<T, U>(input: IFormInput<T>, wrapped: IFormInput<U>, valid: TestValidity, change: OnChange<U>): IFormInput<T> {
  return {
    ...input,
    onMadeDirty: () => {
      input.onMadeDirty();
      if (!!wrapped.onMadeDirty) {
        wrapped.onMadeDirty();
      }
    },
    onValidChange: isValid => {
      input.onValidChange(isValid);
      if (!!wrapped.onValidChange) {
        wrapped.onValidChange(valid());
      }
    },
    onChange: t => {
      input.onChange(t);
      wrapped.onChange(change());
    }
  };
}
