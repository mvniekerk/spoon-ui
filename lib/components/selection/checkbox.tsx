import './selection.scss';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import Check from '@material-ui/icons/Check';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';
import { IOnChange } from '../../util/on-change';

export type CheckboxProps<T> = ITranslatedSelectableValue<T> & IOnChange<T> & HTMLAttributes<HTMLInputElement>;

export interface ICheckboxState {
  checked: boolean;
}

export class Checkbox<T> extends React.Component<CheckboxProps<T>, ICheckboxState> {
  state: ICheckboxState = {
    checked: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState(_ => ({ checked: this.props.selected }));
  }

  handleChange(event) {
    const checked = event.target.checked;
    if (!!this.props.onChange) {
      this.props.onChange(checked ? this.props.value : undefined);
    }
    this.setState({ checked });
  }

  render() {
    const { id, className, disabled, value, ...other } = this.props;
    const selected = this.state && this.state.checked;

    let i = null;
    const input = (
      <input
        {...other}
        ref={ii => (i = ii)}
        checked={this.state.checked}
        className="styled-checkbox"
        id={id}
        type="checkbox"
        onChange={this.handleChange}
        disabled={disabled}
      />
    );
    const onClick = _ => i.click();

    const checkbox = selected ? <Check className="checkbox-check" /> : null;
    return (
      <div className={cx(className, 'selection-container checkbox-container', selected, disabled)} onClick={onClick}>
        {checkbox}
        {input}
        <label htmlFor={id} className="selection-text">
          {translateItem(this.props)}
        </label>
      </div>
    );
  }
}
