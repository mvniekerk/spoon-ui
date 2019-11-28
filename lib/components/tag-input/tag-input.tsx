import '../dropdown/dropdown.scss';
import './tag-input.scss';
import React, { ChangeEvent } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, FormGroup, Input, Label } from 'reactstrap';
import { ScrollableArea } from '../scrollable-area/scrollable-area';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';
import { DropdownTag } from '../dropdown/dropdown-tag';

import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
import triangle from '../../../static/images/triangle.svg';
import { Grid } from '../grid/grid';
import { IDropdownItem } from '../dropdown/dropdown-item';
import { WithPopover } from '../with-popover/with-popover';

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

  private valSelected = (val: ITranslatedSelectableValue<string>) => {
    this.setState(prevState => {
      const vals = prevState.selection;
      if (!vals.includes(val)) {
        vals.push(val);
      }
      return { selection: vals };
    });
  };

  private valDeselected = (val: ITranslatedSelectableValue<string>) => {
    val.selected = false;
    this.setState(prevState => {
      const vals = prevState.selection;
      if (vals.includes(val)) {
        vals.splice(vals.indexOf(val), 1);
      }
      return { selection: vals };
    });
  };

  private onSearchChanged = (val: ChangeEvent<HTMLInputElement>) => {
    if (val.target) {
      const value = val.target.value;
      // this.searchItem.next(value);
      this.setState(_ => ({ search: value }));
    }
  };

  private dropdownSelected = e => {
    this.setState(p => ({
      search: !!p.search ? p.search : ' '
    }));
  };

  private renderTag = (item: IDropdownItem<string>) => (
    <DropdownTag
      selectable
      value={item}
      key={item.name || (item.value && item.value.toString())}
      onSelected={this.valSelected}
      onDeselected={this.valDeselected}
    />
  );

  private renderSelectionBarItem = v => (
    <DropdownTag
      value={v}
      key={v.name || (v.value && v.value.toString())}
      onSelected={this.valSelected}
      onDeselected={this.valDeselected}
    />
  );

  private renderSelectionBar = () => (
    <Grid className="tags-container selected-tags" items={this.state.selection} itemRender={this.renderSelectionBarItem} />
  );

  render() {
    const items =
      !this.props.searching && !!this.props.values
        ? this.props.values.filter(
            b =>
              !this.state.search ||
              !this.state.search.trim() ||
              ('' + b.value).toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0 ||
              translateItem(b)
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) >= 0
          )
        : [];

    return (
      <>
        <WithPopover
          className="tag-input"
          autoOpen
          autoClose
          closeOnMainClick
          mainComponent={
            <div>
              {!!this.props.message && <Label for="inputwithoutvalidation">{this.props.message}</Label>}
              <Input
                placeholder={this.props.placeholder}
                value={this.state.search}
                onChange={this.onSearchChanged}
                onKeyDown={this.onKeyPressed}
              />
            </div>
          }
        >
          <div className="tags multiple">
            <ScrollableArea>
              {this.props.searching ? (
                <i key="searching">Searching</i>
              ) : (
                <Grid className="tags-container" items={items} itemRender={this.renderTag} />
              )}
            </ScrollableArea>
          </div>
        </WithPopover>
        {this.renderSelectionBar()}
      </>
    );
  }
}
