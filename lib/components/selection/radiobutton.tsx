import './selection.scss';
import React from 'react';

export interface IRadioProps {
  name: string;
  label: string;
  disabled: boolean;
  checked: boolean;
  id: string;
  value: string;
  handleChange: (val) => void;
}

export interface IRadioState {
  checked: boolean;
}

export class RadioButton extends React.Component<IRadioProps, IRadioState> {
  static defaultProps = {
    name: 'default',
    label: '',
    disabled: false,
    checked: false,
    id: '',
    value: '',
    handleChange: val => {}
  };

  state: IRadioState = {
    checked: false
  };

  input: any;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState(_ => ({ checked: this.props.checked }));
  }

  handleChange(event) {
    if (!!this.props.handleChange) {
      this.props.handleChange(event);
    }
  }

  render() {
    const selected = (this.state && this.state.checked) || this.props.checked;

    let i = null;

    const handleChange = event => this.handleChange(event);
    this.input = (
      <input
        ref={ii => (i = ii)}
        className="styled-radio"
        id={this.props.id}
        type="radio"
        onChange={handleChange}
        disabled={this.props.disabled}
        name={this.props.name}
        value={this.props.value}
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
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default RadioButton;
