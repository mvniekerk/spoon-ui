import React from 'react';
import { IDirtyInput, ITranslatedSelectableValue, ITranslatedValue } from '../../util';

export interface IRadioInputProps<T> extends IDirtyInput<T>, ITranslatedValue<string> {
  values: Array<ITranslatedSelectableValue<T>>;
}

export class RadioInput<T> extends React.Component<IRadioInputProps<T>> {}
