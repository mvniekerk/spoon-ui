import './selection.scss';
import React from 'react';
import { translateItem } from '../../util/translation';
import { IRadioButtonValue } from './radio-button-value';
import { IOnChange } from '../../util/on-change';

export interface IRadioState {
  checked: boolean;
}

export class RadioButton<T> extends React.Component<IRadioButtonValue<T> & IOnChange<T>, IRadioState> {
  state: IRadioState = {
    checked: false
  };

  input: any;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState(_ => ({ checked: this.props.selected }));
  }

  render() {
    const selected = (this.state && this.state.checked) || this.props.selected;

    let i = null;

    const handleChange = event => {
      if (!!this.props.onChange) {
        this.props.onChange(this.props.value);
      }
    };

    this.input = (
      <input
        ref={ii => (i = ii)}
        className="styled-radio"
        id={this.props.id}
        type="radio"
        onChange={handleChange}
        disabled={this.props.disabled}
        name={this.props.name}
        value={`${this.props.value}`}
      />
    );

    const onClick = _ => i.click();

    const dot = selected ? <div className="radio-dot" /> : null;

    return (
      <div
        className={'selection-container radiobutton-container' + (selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '')}
        onClick={onClick}
      >
        {dot}
        {this.input}
        <label htmlFor={this.props.id} className="selection-text">
          {translateItem(this.props)}
        </label>
      </div>
    );
  }
}

export default RadioButton;
