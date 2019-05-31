import './selection.scss';
import React from 'react';
import Check from '@material-ui/icons/Check';

export interface ICheckboxProps {
  name: string;
  label: string;
  disabled: boolean;
  checked: boolean;
  id: string;
}

export interface ICheckboxState {
  checked: boolean;
}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  static defaultProps = {
    name: 'default',
    label: '',
    disabled: false,
    checked: false,
    id: ''
  };

  state: ICheckboxState = {
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
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
