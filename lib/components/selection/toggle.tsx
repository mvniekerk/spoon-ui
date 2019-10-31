import './selection.scss';
import React from 'react';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';

export interface IToggleState {
  checked: boolean;
}

export class Toggle extends React.Component<ITranslatedSelectableValue<boolean>, IToggleState> {
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

  handleChange(event) {
    this.setState({ checked: event.target.checked });
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
