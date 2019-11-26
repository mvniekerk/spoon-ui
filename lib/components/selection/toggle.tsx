import './selection.scss';
import React from 'react';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';
import { IOnChange } from '../../util/on-change';

export interface IToggleState {
  checked: boolean;
}

export class Toggle extends React.Component<ITranslatedSelectableValue<boolean> & IOnChange<boolean>, IToggleState> {
  state: IToggleState = {
    checked: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState(_ => ({ checked: this.props.selected }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ checked: this.props.selected });
    }
    if (prevProps.value !== this.props.value) {
      this.setState({ checked: Boolean(this.props.value) });
    }
  }

  handleChange(event) {
    this.setState({ checked: event.target.checked });
    this.props.onChange && this.props.onChange(this.state.checked);
  }

  render() {
    const selected = this.state && this.state.checked;
    const labelClass = 'switch' + (selected ? ' checked' : '') + (this.props.disabled ? ' disabled' : '');

    return (
      <div className={'toggle-container selection-container' + (selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '')}>
        <label className={labelClass}>
          <input
            type="checkbox"
            name={this.props.id}
            checked={this.state.checked}
            onChange={this.handleChange}
            disabled={this.props.disabled}
          />
          <span className="slider round" />
        </label>
        <label className="selection-text">{translateItem(this.props)}</label>
      </div>
    );
  }
}
