import './selection.scss';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import { translateItem } from '../../util/translation';
import { IRadioButtonValue } from './radio-button-value';

export type IRadioButtonProps<T> = IRadioButtonValue<T> & Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;
export interface IRadioState {
  checked: boolean;
}

export class RadioButton<T> extends React.Component<IRadioButtonProps<T>, IRadioState> {
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

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ checked: this.props.selected });
    }
  }

  render() {
    const { id, className, selected, onChange, value, disabled, ...other } = this.props;
    const isSelected = (this.state && this.state.checked) || selected;

    let i = null;

    const handleChange = event => {
      if (!!onChange) {
        onChange(value);
      }
    };

    this.input = (
      <input
        {...other}
        ref={ii => (i = ii)}
        className="styled-radio"
        id={this.props.id}
        type="radio"
        onChange={handleChange}
        disabled={this.props.disabled}
        name={this.props.groupName}
        value={`${this.props.value}`}
      />
    );

    const onClick = _ => i.click();

    const dot = isSelected ? <div className="radio-dot" /> : null;

    return (
      <div
        className={cx(className, 'selection-container radiobutton-container', {
          selected,
          disabled
        })}
        onClick={onClick}
      >
        {dot}
        {this.input}
        <label htmlFor={id} className="selection-text">
          {translateItem(this.props)}
        </label>
      </div>
    );
  }
}
