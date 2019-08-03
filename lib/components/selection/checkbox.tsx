import './selection.scss';
import React from 'react';
import Check from '@material-ui/icons/Check';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';
import { IOnChange } from '../../util/on-change';

export type CheckboxProps<T> = ITranslatedSelectableValue<T> & IOnChange<T>;

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
    const selected = this.state && this.state.checked;

    let i = null;
    const input = (
      <input
        ref={ii => (i = ii)}
        checked={this.state.checked}
        className="styled-checkbox"
        id={this.props.id}
        type="checkbox"
        onChange={this.handleChange}
        disabled={this.props.disabled}
      />
    );
    const onClick = _ => i.click();

    const checkbox = selected ? <Check className="checkbox-check" /> : null;

    return (
      <div
        className={'selection-container checkbox-container' + (selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '')}
        onClick={onClick}
      >
        {checkbox}
        {input}
        <label htmlFor={this.props.id} className="selection-text">
          {translateItem(this.props)}
        </label>
      </div>
    );
  }
}

export default Checkbox;
