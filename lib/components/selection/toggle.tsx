import './selection.scss';
import React from 'react';

export interface IToggleProps {
  name: string;
  label: string;
  disabled: boolean;
  checked: boolean;
}

export interface IToggleState {
  checked: boolean;
}

export class Toggle extends React.Component<IToggleProps, IToggleState> {
  static defaultProps = {
    name: 'default',
    label: '',
    disabled: false,
    checked: false
  };

  state: IToggleState = {
    checked: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState(_ => ({ checked: this.props.checked }));
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
            name={this.props.name}
            checked={this.state.checked}
            onChange={this.handleChange}
            disabled={this.props.disabled}
          />
          <span className="slider round" />
        </label>
        <label className="selection-text">{this.props.label}</label>
      </div>
    );
  }
}

export default Toggle;
