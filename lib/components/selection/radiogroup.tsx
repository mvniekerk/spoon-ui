import React from 'react';
import { FormGroup } from 'reactstrap';
import { RadioButton } from './radiobutton';
import { IRadioButtonValue } from './radio-button-value';

export interface IRadioGroupProps {
  values: IRadioButtonValue[];
  name: string;
}

export interface IRadioGroupState {
  selected: any;
}

export class RadioGroup extends React.Component<IRadioGroupProps, IRadioGroupState> {
  static defaultProps: IRadioGroupProps = {
    values: [],
    name: ''
  };

  state: IRadioGroupState = {
    selected: ''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const v = this.props.values.find(a => a.checked);
    if (!!v) {
      this.setState(_ => ({ selected: v.value }));
    }
  }

  handleChange(event) {
    const val = event.target.value;
    this.setState(prevState => ({ selected: val }));
  }

  render() {
    const vals = this.props.values.map(v => (
      <RadioButton
        key={this.props.name}
        {...v}
        handleChange={this.handleChange}
        checked={v.value === this.state.selected}
        name={this.props.name}
      />
    ));
    return <FormGroup>{vals}</FormGroup>;
  }
}

export default RadioGroup;
