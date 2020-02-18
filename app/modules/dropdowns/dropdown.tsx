import './dropdown.scss';

import React from 'react';
import { Row, Col } from 'reactstrap';

import PersonOutline from '@material-ui/icons/PersonOutline';
import Settings from '@material-ui/icons/Settings';
import Place from '@material-ui/icons/Place';

import { Dropdown, IDropdownItem } from 'lib/components';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

const singleSelection: Array<IDropdownItem<string>> = [
  { display: 'First', value: 'first', selected: true },
  { display: 'Second', value: 'second' },
  { display: 'Third', value: 'third' }
];

const multipleSelection: Array<IDropdownItem<string>> = [
  { display: 'First', value: 'first' },
  { display: 'Second', value: 'second' },
  { display: 'Third', value: 'third' }
];

const singleSelectionWithIcon: Array<IDropdownItem<string>> = [
  { display: 'Your account', value: 'first', icon: <PersonOutline />, selected: true },
  { display: 'Settings', value: 'second', icon: <Settings />, selected: true },
  { display: 'Map', value: 'third', icon: <Place /> },
  { display: 'Logout', value: 'logout', icon: <PowerSettingsNew />, splitTop: true }
];

const searchSingleSelection: Array<IDropdownItem<string>> = [
  { display: 'Your account', value: 'first' },
  { display: 'Settings', value: 'second' },
  { display: 'Map', value: 'third' }
];

const searchMultipleTooLongSelection: Array<IDropdownItem<string>> = `
    As I was saying the mother of this particular hobbit of Bilbo Baggins that is was the famous Belladonna Took one of the three remarkable daughters of the Old Took head
     of the hobbits who lived across The Water the small river that ran on the foot of The Hill It was often said (in other families) that long ago one of the Took ancestors must
      have taken a fairy wife That was of course, absurd but certainly there was still something not entirely hobbitlike about them and once in a while members of the Took-clan
       would go and have adventures They discreetly disappeared and the family hushed it up but the fact remained that the Tooks were not as respectable as the Bagginses though
        they were undoubtedly richer
    We are plain quiet folk and have no use for adventures Nasty disturbing uncomfortable things Make you late for dinner I can't think what anybody sees in them said
     our Mr. Baggins and stuck one thumb behind his braces and blew out another even bigger smoke-ring Then he took out his morning letters and began to read pretending to take
    no more notice of Gandalf He had decided that he was not quite his sort and wanted him to go away But the old man did not move`
  .split(' ')
  .map(a => a.trim())
  .filter(a => !!a)
  .map((v, i) => ({ display: v, value: `val${i}` }));

// initially selected values for tags
searchMultipleTooLongSelection[0].selected = true;
searchMultipleTooLongSelection[3].selected = true;
searchMultipleTooLongSelection[4].selected = true;

export class DropdownDemo extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md="12">
            <div className="small-header">Dropdown selects</div>
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              label="Label for dropdown"
              key="dropdown1"
              required
              placeholder="Single selection"
              initialValues={singleSelection}
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              key="dropdown1"
              label="Label for dropdown"
              placeholder="Multiple selection"
              initialValues={multipleSelection}
              multiple
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              key="dropdown1"
              label="Label for dropdown"
              placeholder="Single with icon"
              initialValues={singleSelectionWithIcon}
              iconLeft
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              required
              key="dropdown1"
              placeholder="Multiple with icon"
              initialValues={singleSelectionWithIcon}
              iconLeft
              multiple
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown {...this.props} key="dropdown1" placeholder="Single with search" initialValues={searchSingleSelection} search />
            <br />
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              key="dropdown1"
              placeholder="Multiple with search"
              initialValues={searchSingleSelection}
              search
              multiple
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              key="dropdown1"
              placeholder="Multiple, overflow with search"
              initialValues={searchMultipleTooLongSelection}
              search
              multiple
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown {...this.props} disabled key="dropdownDisabled" placeholder="Disabled" initialValues={singleSelection} />
            <br />
          </Col>
        </Row>

        <Row>
          {/* <Col md="12">
            <div className="small-header">Tag selects</div>
          </Col> */}
          <Col md="12">
            <Dropdown
              {...this.props}
              key="dropdown1"
              label="Tag selects"
              placeholder="Multiple, overflow with search"
              initialValues={searchMultipleTooLongSelection}
              search
              multiple
              tags
              selectionBar
            />
            <br />
          </Col>
          <Col md="4">
            <Dropdown
              {...this.props}
              key="dropdown1"
              placeholder="Multiple, smaller, overflow with search"
              initialValues={searchMultipleTooLongSelection}
              search
              multiple
              tags
            />
            <br />
          </Col>
        </Row>
      </div>
    );
  }
}
