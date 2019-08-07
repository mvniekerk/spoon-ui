import './dropdown.scss';
import React, { ChangeEvent } from 'react';
import { Dropdown as RDropdown, DropdownToggle, DropdownMenu, FormGroup } from 'reactstrap';
import { DropdownItem, IDropdownItem } from './dropdown-item';
import { TranslatedValueOrKey, translateItem } from '../../util/translation';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
/* tslint:disable:no-submodule-imports */
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
/* tslint:enable:no-submodule-imports */
import Search from '@material-ui/icons/Search';
import triangle from '../../../static/images/triangle.svg';
const triangleImage = `url("${triangle}")`;

export interface IDropdownProps<T> {
  multiple?: boolean;
  search?: boolean;
  searchFunction?: (state: IDropdownState<T>, search: string) => Promise<Array<IDropdownItem<T>>>;
  initialValues?: Array<IDropdownItem<T>>;
  initialSelection?: Array<IDropdownItem<T>>;
  iconLeft?: boolean;
  iconRight?: boolean;
  selectAll?: boolean;
  placeholder?: TranslatedValueOrKey<T>;
  tags?: boolean;
  onValueSelected: Function;
  onValueDeselected: Function;
  disabled: boolean;
  alignRight: boolean;
  disableDeselect: boolean;
  unselectable: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface IDropdownState<T> {
  selection: Array<IDropdownItem<T>>;
  searching: boolean;
  values: Array<IDropdownItem<T>>;
  dropdownOpen: boolean;
  search?: string;
}

const ArrowUpLeft = props => <div className="arrow-up-left" style={{ backgroundImage: triangleImage }} />;

export class Dropdown<T> extends React.Component<IDropdownProps<T>, IDropdownState<T>> {
  static defaultProps = {
    alignRight: false,
    multiple: false,
    search: false,
    searchFunction: (state: IDropdownState<any>, search: string) =>
      Promise.resolve(
        state.values
          .map(m => '' + m)
          .filter(m => m.startsWith(search))
          .map(m => ({ display: m, value: m }))
      ),
    selectAll: false,
    tags: false,
    onValueSelected: (v, i) => {},
    onValueDeselected: (v, i) => {},
    disabled: false,
    direction: 'down',
    disableDeselect: false,
    unselectable: true
  };

  state: IDropdownState<T> = {
    selection: [],
    searching: false,
    values: [],
    dropdownOpen: false
  };

  toggle() {
    const dropdownOpen = !this.state.dropdownOpen;
    this.setState({ dropdownOpen, search: '' });
    if (dropdownOpen && !!this.props.onOpen) {
      this.props.onOpen();
    }
    if (!dropdownOpen && !!this.props.onClose) {
      this.props.onClose();
    }
  }

  constructor(props: IDropdownProps<T>) {
    super(props);
  }

  componentDidMount() {
    if (this.props.initialValues) {
      this.setState(_ => ({ values: this.props.initialValues }));
    }
  }

  componentDidUpdate(oldProps: IDropdownProps<T>, oldState: IDropdownState<T>) {
    if (oldProps.initialValues !== this.props.initialValues) {
      this.setState(_ => ({ values: this.props.initialValues }));
    }
  }

  public get selection(): Array<IDropdownItem<T>> {
    return this.state.selection;
  }

  render() {
    const a = () => this.toggle();
    const valSelected = (val: IDropdownItem<T>, sender: DropdownItem<T>) => {
      if (!this.props.multiple) {
        a.call([]);
        this.state.values.filter(i => i !== val).forEach(i => (i.selected = false));
        this.setState(_ => ({ selection: [val] }));
      } else {
        this.setState(prevState => {
          const vals = prevState.selection;
          if (!vals.includes(val)) {
            vals.push(val);
          }
          return { selection: vals };
        });
      }
      this.props.onValueSelected(val, sender);
    };

    const valDeselected = (val: IDropdownItem<T>, sender: DropdownItem<T>) => {
      if (!this.props.multiple && !this.props.disableDeselect) {
        a.call([]);
        this.setState(_ => ({ selection: [] }));
        this.props.onValueDeselected(val, sender);
      } else if (this.props.multiple) {
        this.setState(prevState => {
          const vals = prevState.selection;
          if (!vals.includes(val)) {
            vals.splice(vals.indexOf(val), 1);
          }
          return { selection: vals };
        });
        this.props.onValueDeselected(val, sender);
      }
    };

    const showIcon = !this.props.multiple && this.state.selection.length === 1;
    const mustShowPlaceholder = !this.props.multiple && this.state.selection.length === 0;

    const dropdownClass = 'toggle caret-right' + (mustShowPlaceholder ? ' placeholder' : '');

    const items =
      !this.state.searching && !!this.state.values
        ? this.state.values
            .filter(
              b =>
                !this.state.search ||
                ('' + b.value).toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0 ||
                translateItem(b)
                  .toLowerCase()
                  .indexOf(this.state.search.toLowerCase()) >= 0
            )
            .map(sv => (
              <DropdownItem
                {...this.props}
                selectable
                value={sv}
                key={sv.name}
                onSelected={valSelected}
                onDeselected={valDeselected}
                tag={this.props.tags}
              />
            ))
        : [];

    const displayText = mustShowPlaceholder
      ? translateItem(this.props.placeholder)
      : this.state.selection.length === 1 && !!this.state.selection[0].value
        ? translateItem(this.state.selection[0])
        : translateItem(this.props.placeholder);

    const onSearchChanged = (val: ChangeEvent<HTMLInputElement>) => {
      if (val.target) {
        const value = val.target.value;
        this.setState(_ => ({ search: value }));
      }
    };

    const searchBar = this.props.search ? (
      <div className="search-container">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input type="text" className="search-input" placeholder="Search" onChange={onSearchChanged} />
        </div>
      </div>
    ) : null;

    const menuClassName =
      (this.props.multiple ? 'multiple' : '') + (this.props.tags ? ' tags' : '') + (this.props.alignRight ? ' align-right' : '');

    const searchingOrItems = this.state.searching ? [<i key="searching">Searching</i>] : items;
    return (
      <FormGroup className="dropdown-form">
        <RDropdown
          isOpen={this.state.dropdownOpen && !!items && items.length > 0}
          toggle={a}
          direction={this.props.alignRight ? 'right' : 'down'}
        >
          <DropdownToggle className={dropdownClass} disabled={this.props.disabled}>
            {showIcon && <span className="dropdown-selection-icon">{this.state.selection[0].icon}</span>}
            <span className="button-text">{showIcon ? <span className="icon-with-text">{displayText}</span> : displayText}</span>
          </DropdownToggle>
          <ArrowUpLeft />

          <DropdownMenu className={menuClassName} flip={false}>
            <div className="top-spacer" />
            {searchBar}
            <PerfectScrollbar>
              {this.props.tags ? <div className="tags-container">{searchingOrItems}</div> : searchingOrItems}
            </PerfectScrollbar>
            <div className="bottom-spacer" />
          </DropdownMenu>
          {!this.state.dropdownOpen && <ExpandMoreRounded className="right-caret" onClick={a} />}
          {this.state.dropdownOpen && <ExpandLessRounded className="right-caret" onClick={a} />}
        </RDropdown>
      </FormGroup>
    );
  }
}
