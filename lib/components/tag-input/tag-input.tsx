import '../dropdown/dropdown.scss';
import './tag-input.scss';
import React, { ChangeEvent } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, FormGroup, Input, Label } from 'reactstrap';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';
import { DropdownItem } from '../dropdown/dropdown-item';

import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
import triangle from '../../../static/images/triangle.svg';

const triangleImage = `url("${triangle}")`;

export interface ITagInputProps {
  searching: boolean;
  values: Array<ITranslatedSelectableValue<string>>;
  message?: string;
  placeholder?: string;
  onAddTag?: (s: ITranslatedSelectableValue<string>) => void;
  onSelectionChanged?: (s: ITranslatedSelectableValue<string>) => void;
}

export interface ITagInputState {
  selection: Array<ITranslatedSelectableValue<string>>;
  dropdownOpen: boolean;
  search?: string;
}

export class TagInput extends React.Component<ITagInputProps, ITagInputState> {
  static defaultProps: ITagInputProps = {
    searching: false,
    values: []
  };

  state: ITagInputState = {
    search: '',
    selection: [],
    dropdownOpen: true
  };

  constructor(props) {
    super(props);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
      search: ''
    }));
  }

  onKeyPressed(val) {
    if (val.keyCode === 13) {
      if (!this.state.search || this.state.search.trim() === '') {
        return;
      }
      const searchText = this.state.search.trim();
      searchText
        .split(',')
        .map(a => a.trim())
        .filter(a => !!a)
        .forEach(search => {
          let item = this.props.values.find(a => a.value.toString().toLowerCase() === search.toLowerCase());
          if (!item) {
            item = {
              display: search,
              value: search,
              selected: true
            };
            !!this.props.onAddTag && this.props.onAddTag(item);
          }
          item.selected = true;
          if (!this.state.selection.find(a => a.value.toString().toLowerCase() === search.toLowerCase())) {
            this.setState(p => {
              const items = [...p.selection, item];
              !!this.props.onSelectionChanged && this.props.onSelectionChanged(item);
              return {
                selection: items,
                search: ''
              };
            });
          } else {
            // this.searchItem.next('');
            this.setState(_ => ({
              search: ''
            }));
          }
        });
    } else if (val.keyCode === 27) {
      this.setState(_ => ({ search: '' }));
    }
  }

  ArrowUpLeft = props => <div className="arrow-up-left" style={{ backgroundImage: triangleImage }} />;

  render() {
    const onSearchChanged = (val: ChangeEvent<HTMLInputElement>) => {
      if (val.target) {
        const value = val.target.value;
        // this.searchItem.next(value);
        this.setState(_ => ({ search: value }));
      }
    };

    const a = () => this.toggle();
    const valSelected = (val: ITranslatedSelectableValue<string>, sender: DropdownItem<string>) => {
      this.setState(prevState => {
        const vals = prevState.selection;
        if (!vals.includes(val)) {
          vals.push(val);
        }
        return { selection: vals };
      });
    };

    const valDeselected = (val: ITranslatedSelectableValue<string>, sender: DropdownItem<string>) => {
      val.selected = false;
      this.setState(prevState => {
        const vals = prevState.selection;
        if (vals.includes(val)) {
          vals.splice(vals.indexOf(val), 1);
        }
        return { selection: vals };
      });
    };

    const dropdownSelected = e => {
      this.setState(p => ({
        search: !!p.search ? p.search : ' '
      }));
    };

    const items =
      !this.props.searching && !!this.props.values
        ? [
            ...this.props.values
              .filter(
                b =>
                  !this.state.search ||
                  !this.state.search.trim() ||
                  ('' + b.value).toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0 ||
                  translateItem(b)
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) >= 0
              )
              .map(sv => (
                <div>
                  <DropdownItem
                    {...this.props}
                    selectable
                    value={sv}
                    key={sv.name}
                    onSelected={valSelected}
                    onDeselected={valDeselected}
                    tag
                  />
                </div>
              ))
          ]
        : [];

    const selected = this.state.selection.map(v => (
      <DropdownItem
        selectable
        tag
        value={v}
        key={!!v.name ? v.name : v.value}
        onSelected={valSelected}
        onDeselected={valDeselected}
        checkNotCross={false}
      />
    ));
    const searchingOrItems = this.props.searching ? [<i key="searching">Searching</i>] : items;

    return (
      <FormGroup className="tag-input">
        {!!this.props.message && <Label for="inputwithoutvalidation">{this.props.message}</Label>}
        <div>
          <Input placeholder={this.props.placeholder} value={this.state.search} onChange={onSearchChanged} onKeyDown={this.onKeyPressed} />
          {!this.state.search && <ExpandMoreRounded className="right-caret" onClick={dropdownSelected} />}
          {!!this.state.search && <ExpandLessRounded className="right-caret" onClick={dropdownSelected} />}
        </div>
        <Dropdown isOpen={!!this.state.search && !!this.props.values && this.props.values.length > 0} toggle={this.toggle}>
          <DropdownToggle style={{ opacity: 0, zIndex: -100, position: 'relative', top: '-38px' }} />

          <this.ArrowUpLeft />
          <DropdownMenu className="tags multiple">
            <div className="top-spacer" />
            <PerfectScrollbar>
              <div className="tags-container">{searchingOrItems}</div>
            </PerfectScrollbar>
            <div className="bottom-spacer" />
          </DropdownMenu>
        </Dropdown>
        <div className="tags-container selected-tags">{selected}</div>
      </FormGroup>
    );
  }
}
