import React from 'react';
import { Col, Row } from 'reactstrap';
import { RadioButton } from './radiobutton';
import { IRadioButtonValue } from './radio-button-value';

export interface IRadioGroupProps<T> {
  values?: Array<IRadioButtonValue<T>>;
  name: string;
  onChanged?: (value: any) => void;
  vertical?: boolean;
  xs?: number;
  md?: number;
  lg?: number;
}

export interface IRadioGroupState {
  selected: any;
}

export class RadioGroup<T> extends React.Component<IRadioGroupProps<T>, IRadioGroupState> {
  static defaultProps: IRadioGroupProps<any> = {
    values: [],
    name: '',
    vertical: false
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
    const selected = event.target.value;
    this.setState({ selected });
    if (!!this.props.onChanged) {
      this.props.onChanged(selected);
    }
  }

  render() {
    const vals = this.props.values.map(v => (
      <Col xs={this.props.xs} lg={this.props.lg} md={this.props.md} key={v.id}>
        <RadioButton
          {...v}
          value={`${v.value}`}
          handleChange={this.handleChange}
          checked={v.value === this.state.selected}
          name={this.props.name}
        />
      </Col>
    ));
    return <div className={`radio-group ${this.props.vertical ? 'vertical' : ''}`}>{this.props.vertical ? vals : <Row>{vals}</Row>}</div>;
  }
}

export default RadioGroup;
