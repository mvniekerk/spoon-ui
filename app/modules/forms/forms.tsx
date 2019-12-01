import './forms.scss';

import React from 'react';
import { Row, Col, Input, InputGroup, FormText, FormFeedback, FormGroup, Label } from 'reactstrap';

import {
  TagInput,
  SearchBar,
  TextInput,
  RadioInput,
  ComboboxInput,
  IValueDirtyAndValid,
  iformInput,
  MultipleSelectionInput,
  Button,
  CalendarInput,
  DropdownSearchBar,
  Container,
  FileUpload
} from 'lib/components';
import { ITranslatedSelectableValue, translatedValue } from 'lib/util';
import { IValidateAndI18nKey, required, requiredString, stringIsNumber } from 'lib/validation';

import Check from '@material-ui/icons/CheckRounded';
import PriorityHighRounded from '@material-ui/icons/PriorityHighRounded';
import CalendarToday from '@material-ui/icons/CalendarToday';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Info from '@material-ui/icons/Info';
import Cancel from '@material-ui/icons/Cancel';

interface IsSmartAnimal {
  name: string;
  smart: boolean;
}

export interface IFormsState {
  values: Array<ITranslatedSelectableValue<string>>;
  search?: string;
  numberInput: string;
  numberInputDirty: boolean;
  numberInputDisabled: boolean;
  radInput: string;
  radDirty: boolean;
  radDisabled: boolean;
  comboVal?: IValueDirtyAndValid<IsSmartAnimal>;
  comboDisabled: boolean;
  multipleVal?: IValueDirtyAndValid<string[]>;
  multipleDisabled: boolean;
  comboChoices: () => Map<IsSmartAnimal, string>;
  multiChoices: () => Map<string, string>;
  date: Date;
}

const defaultValues = {
  values: [],
  search: '',
  numberInput: '',
  numberInputDirty: false,
  numberInputDisabled: false,
  radInput: '',
  radDirty: false,
  comboVal: { value: undefined },
  multipleVal: { value: undefined },
  comboChoices: () =>
    new Map([
      [{ name: 'sheep', smart: false }, 'Sheep'],
      [{ name: 'dog', smart: true }, 'Dog'],
      [{ name: 'horse', smart: true }, 'Horse'],
      [{ name: 'cow', smart: false }, 'Cow']
    ]),
  multiChoices: () => new Map<string, string>([['one', 'One'], ['two', 'Two'], ['three', 'Three']]),
  radDisabled: false,
  comboDisabled: false,
  multipleDisabled: false,
  date: null
};
export class Forms extends React.Component<{}, IFormsState> {
  state = defaultValues;
  updateCount = 1;

  constructor(props) {
    super(props);
    this.onAddTag = this.onAddTag.bind(this);
    this.searchChanged = this.searchChanged.bind(this);
    this.resetValues();
  }

  resetValues = () => {
    this.updateCount = 1;
    this.setState(defaultValues);
  };

  onAddTag(a: ITranslatedSelectableValue<string>) {
    if (!!a) {
      this.setState(p => ({
        values: [...p.values, a]
      }));
    }
  }

  searchChanged(search: string) {
    this.setState({ search });
  }

  handleDateChange = chosenDate => {
    this.setState({
      date: chosenDate
    });
  };

  renderTextInput() {
    const onNumberInputChange = numberInput => this.setState({ numberInput });
    const onNumberInputMadeDirty = () => this.setState({ numberInputDirty: true });
    const toggleDisabled = () => this.setState(p => ({ numberInputDisabled: !p.numberInputDisabled }));
    return (
      <Row>
        <Col md="12">
          <div className="small-header">Text using TextInput component and validations</div>
        </Col>
        <Col md="4">
          <TextInput
            enableTicks
            label="This is my label"
            id="textInputExample"
            placeholder="Value is required and must be a number"
            dirty={this.state.numberInputDirty}
            onMadeDirty={onNumberInputMadeDirty}
            value={this.state.numberInput}
            onChange={onNumberInputChange}
            helpMessage="This field is required"
            validMessage="Well done"
            validation={[{ func: requiredString, i18n: 'Value is required' }, { func: stringIsNumber, i18n: 'Must be a number' }]}
            required
            disabled={this.state.numberInputDisabled}
          />
          <Button onClick={toggleDisabled}>{this.state.numberInputDisabled ? 'Enable' : 'Disable'}</Button>
        </Col>
      </Row>
    );
  }

  renderRadioButtonInput() {
    const choices = () =>
      new Map<string, string>([['Yes', 'forms.radioInput.yes'], ['No', 'forms.radioInput.no'], ['Maybe', 'forms.radioInput.maybe']]);
    const onChange = radInput => this.setState({ radInput });
    const onDirty = () => this.setState({ radDirty: true });
    const notMaybe: IValidateAndI18nKey<string> = {
      func: (i18nKey, val) => (val !== 'Maybe' ? [] : [translatedValue('Maybe you should choose')]),
      i18n: ''
    };
    const notNo: IValidateAndI18nKey<string> = {
      func: (i18nKey, val) => (val !== 'No' ? [] : [translatedValue('Not taking no for an answer')]),
      i18n: ''
    };

    const toggleDisabled = () => this.setState(p => ({ radDisabled: !p.radDisabled }));

    return (
      <Row>
        <Col md="12">
          <div className="small-header">Using RadioInput component and validations</div>
        </Col>
        <Col md="4">
          <RadioInput
            md={4}
            choices={choices}
            id="radInput"
            value={this.state.radInput}
            onChange={onChange}
            dirty={this.state.radDirty}
            onMadeDirty={onDirty}
            label="Do you want coffee?"
            helpMessage="Maybe is not allowed"
            validMessage="Some coffee on its way"
            validation={[notMaybe, notNo]}
            disabled={this.state.radDisabled}
          />
          <Button onClick={toggleDisabled}>{this.state.radDisabled ? 'Enable' : 'Disable'}</Button>
        </Col>
      </Row>
    );
  }

  get incrementUpdateCount(): number {
    return ++this.updateCount;
  }

  renderComboboxInput() {
    const comboVals = iformInput(a => a.comboVal, this);

    const isSmart: IValidateAndI18nKey<IsSmartAnimal> = {
      func: (i18nKey: string, v: IsSmartAnimal) => (!!v && v.smart ? [] : [translatedValue<IsSmartAnimal>('Not a smart animal')]),
      i18n: ''
    };
    const onClick = () =>
      this.setState({
        comboChoices: () =>
          new Map([
            [{ name: 'sheep', smart: false }, `Sheep ${this.incrementUpdateCount}`],
            [{ name: 'dog', smart: true }, `Dog ${this.updateCount}`],
            [{ name: 'horse', smart: true }, `Horse ${this.updateCount}`],
            [{ name: 'cow', smart: false }, `Cow ${this.updateCount}`]
          ])
      });
    const toggleDisabled = () => this.setState(p => ({ comboDisabled: !p.comboDisabled }));
    return (
      <Row>
        <Col md="12">
          <div className="small-header">Using ComboInput component and validations</div>
        </Col>
        <Col md="4">
          <ComboboxInput
            choices={this.state.comboChoices}
            id="smartAnimal"
            {...comboVals}
            validation={[isSmart]}
            helpMessage="Try to select a smart animal"
            placeholder="forms.comboInput.placeholder"
            required
            disabled={this.state.comboDisabled}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button style={{ marginRight: '8px' }} onClick={onClick} color="primary">
              Simulate update
            </Button>
            <Button onClick={toggleDisabled}>{this.state.comboDisabled ? 'Enable' : 'Disable'}</Button>
          </div>
        </Col>
      </Row>
    );
  }

  renderMultipleSelectionInput() {
    const only2: IValidateAndI18nKey<string[]> = {
      func: (k, v) => (!!v && v.length === 2 ? [] : [translatedValue<string[]>('Must select exactly two')]),
      i18n: 'Must select exactly two'
    };
    const requiredVal = { func: required, i18n: 'Please select a value' };
    const vals = iformInput(b => b.multipleVal, this, [requiredVal, only2]);
    const onClick = () =>
      this.setState({ multiChoices: () => new Map<string, string>([['one', 'One 1'], ['two', 'Two 2'], ['three', 'Three 3']]) });

    const toggleDisabled = () => this.setState(p => ({ multipleDisabled: !p.multipleDisabled }));

    return (
      <Row>
        <Col md="12">
          <div className="small-header">Multiple selections with selection bar</div>
        </Col>
        <Col md="4">
          <MultipleSelectionInput
            label="Select any 2"
            {...vals}
            choices={this.state.multiChoices}
            selectionBar
            disabled={this.state.multipleDisabled}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button style={{ marginRight: '8px' }} onClick={onClick} color="primary">
              Simulate change
            </Button>
            <Button onClick={toggleDisabled}>{this.state.multipleDisabled ? 'Enable' : 'Disable'}</Button>
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <>
        <Button onClick={this.resetValues}>Reset all values</Button>
        {this.renderTextInput()}
        {this.renderRadioButtonInput()}
        {this.renderComboboxInput()}
        {this.renderMultipleSelectionInput()}
        <Row>
          <Col md="4">
            <div className="small-header">Text Inputs</div>
            <Input placeholder="Placeholder" />
            <Input text="Text" value="Has Text" />

            <InputGroup className="is-valid">
              <Input valid placeholder="Placeholder" value="Correct input" />
              <Check className="material-icons valid-icon" />
            </InputGroup>
            <InputGroup className="is-invalid">
              <Input invalid placeholder="Placeholder" value="Incorrect input" />
              <PriorityHighRounded className="material-icons invalid-icon" />
            </InputGroup>
            <Input text="Text" value="Disabled" disabled />
          </Col>
          <Col md="4">
            <div className="small-header">With icon</div>
            <InputGroup className="input-group-icon-left">
              <Input placeholder="Placeholder" />
              <CalendarToday className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-left">
              <Input placeholder="Placeholder" value="Has Text" />
              <PersonOutline className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="is-valid input-group-icon-left">
              <Input valid placeholder="Placeholder" value="Correct input" />
              <Check className="material-icons valid-icon" />
              <CalendarToday className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="is-invalid input-group-icon-left">
              <Input invalid placeholder="Placeholder" value="Incorrect input" />
              <PriorityHighRounded className="material-icons invalid-icon" />
              <PersonOutline className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-left">
              <Input disabled valid placeholder="Placeholder" value="Disabled" />
              <CalendarToday className="material-icons left-icon" />
            </InputGroup>
          </Col>
          <Col md="4">
            <div className="small-header">With icon right</div>
            <InputGroup className="input-group-icon-right">
              <Input placeholder="Placeholder" />
              <CalendarToday className="material-icons right-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-right">
              <Input placeholder="Placeholder" value="Has Text" />
              <PersonOutline className="material-icons right-icon" />
            </InputGroup>

            <InputGroup className="is-valid input-group-icon-right">
              <Input valid placeholder="Placeholder" value="Correct input" />
              <Check className="material-icons valid-icon" />
              <CalendarToday className="material-icons right-icon" />
            </InputGroup>
            <InputGroup className="is-invalid input-group-icon-right">
              <Input invalid placeholder="Placeholder" value="Incorrect input" />
              <PriorityHighRounded className="material-icons invalid-icon" />
              <PersonOutline className="material-icons right-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-right">
              <Input disabled valid placeholder="Placeholder" value="Disabled" />
              <CalendarToday className="material-icons right-icon" />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="small-header">Text inputs with labels</div>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="inputwithoutvalidation">Without validation</Label>
              <Input id="inputwithoutvalidation" placeholder="Placeholder" />
            </FormGroup>
            <FormGroup>
              <Label for="inputwithoutvalidation">Required field</Label>
              <Input id="inputwithoutvalidation" placeholder="Placeholder" />
              <FormText>
                <span>
                  <Info className="material-icons" />
                  Example help text that remains unchanged.
                </span>
              </FormText>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="inputwithoutvalidation">Correct field</Label>
              <Input valid placeholder="Placeholder" value="Correct input" />
            </FormGroup>

            <FormGroup>
              <Label for="inputwithoutvalidation">With message</Label>
              <Input valid placeholder="Placeholder" value="Correct input" />
              <FormFeedback valid>
                <Info className="material-icons" />
                Positive message
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="error">With message</Label>
              <Input invalid id="error" placeholder="Placeholder" value="Correct input" />
              <FormFeedback invalid>
                <Cancel className="material-icons" />
                Error notification
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="small-header">Input Bars</div>
          </Col>
          <Col md="8">
            <Label>SearchBar</Label>
            <SearchBar value={this.state.search} onSearchChanged={this.searchChanged} />
            <FormFeedback valid>
              <Info className="material-icons" />
              {this.state.search}
            </FormFeedback>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Label>SearchBar (disabled)</Label>
            <SearchBar disabled onSearchChanged={this.searchChanged} />
            <FormFeedback valid>
              <Info className="material-icons" />
              {this.state.search}
            </FormFeedback>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="small-header">Async dropdown selection (TagInput)</div>
          </Col>
          <Col md="6">
            <TagInput values={this.state.values} onAddTag={this.onAddTag} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>CalendarInput</Label>
              <CalendarInput placeholder="Pick a date" id="expiry-date-cal" value={this.state.date} onChange={this.handleDateChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>CalendarInput (disabled)</Label>
              <CalendarInput id="expiry-date-cal-dis" disabled value={this.state.date} onChange={this.handleDateChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>DropdownSearchBar (controlled)</Label>
            <DropdownSearchBar
              value={this.state.search}
              id="dropdown-search-bar-1"
              placeholder="Type something"
              onSearchChanged={this.searchChanged}
            >
              <Container>
                <Row>
                  <Col>
                    Custom content goes here:
                    <Button>Button</Button>
                    <CalendarInput id="expiry-date-cal-2" value={this.state.date} onChange={this.handleDateChange} />
                  </Col>
                </Row>
              </Container>
            </DropdownSearchBar>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>DropdownSearchBar (disabled)</Label>
            <DropdownSearchBar id="dropdown-search-bar-1-dis" disabled placeholder="Type something" onSearchChanged={this.searchChanged}>
              <Container>
                <Row>
                  <Col>
                    Custom content goes here:
                    <Button>Button</Button>
                    <CalendarInput id="expiry-date-cal-2-dis" value={this.state.date} onChange={this.handleDateChange} />
                  </Col>
                </Row>
              </Container>
            </DropdownSearchBar>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>FileUpload </Label>
            <FileUpload id="files" labelIdle="forms.fileUpload.idle" />
          </Col>
        </Row>
      </>
    );
  }
}
