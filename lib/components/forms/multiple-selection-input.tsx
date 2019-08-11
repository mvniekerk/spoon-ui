import React from 'react';
import { IFormInput } from './form-input';
import { ITranslatedSelectableValue } from '../../util';

export class MultipleSelectionInput<T> extends React.Component<IFormInput<Array<ITranslatedSelectableValue<T>>>> {
  render() {
    return <div />;
  }
}
