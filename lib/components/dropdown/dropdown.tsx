import './dropdown.scss';
import React from 'react';
import cx from 'classnames';
import { DropdownItem, IDropdownItem } from './dropdown-item';
import { DropdownTag } from './dropdown-tag';
import { TranslatedValueOrKey, translateItem } from '../../util/translation';
import { WithPopover } from '../with-popover/with-popover';
import { Button } from '../button/button';
import { ScrollableArea } from '../scrollable-area/scrollable-area';
import { DropdownToggleProps } from 'reactstrap/lib/DropdownToggle';
import { Grid } from '../grid/grid';
import { SearchBar } from '../search-bar/search-bar';
import { Label } from '../layout';

export interface IDropdownProps<T> extends Omit<DropdownToggleProps, 'placeholder'> {
  multiple?: boolean;
  search?: boolean;
  selectionBar?: boolean;
  initialValues?: Array<IDropdownItem<T>>;
  iconLeft?: boolean;
  iconRight?: boolean;
  selectAll?: boolean;
  placeholder?: TranslatedValueOrKey<T>;
  tags?: boolean;
  onValueSelected?: (v: IDropdownItem<T>) => void;
  onValueDeselected?: (v: IDropdownItem<T>) => void;
  onSelectionChanged?: (selection: Array<IDropdownItem<T>>) => void;
  disabled?: boolean;
  alignRight?: boolean;
  disableDeselect?: boolean;
  unselectable?: 'on' | 'off';
  onOpen?: () => void;
  onClose?: () => void;
  label?: TranslatedValueOrKey<T>;
  required?: boolean;
}

export interface IDropdownState<T> {
  selection: Array<IDropdownItem<T>>;
  searching: boolean;
  values: Array<IDropdownItem<T>>;
  searchValue?: string;
}

export class Dropdown<T> extends React.Component<IDropdownProps<T>, IDropdownState<T>> {
  static defaultProps = {
    alignRight: false,
    multiple: false,
    searchValue: '',
    selectAll: false,
    tags: false,
    onValueSelected: v => {},
    onValueDeselected: v => {},
    disabled: false,
    direction: 'down',
    disableDeselect: false,
    unselectable: 'on',
    required: false
  };

  state: IDropdownState<T> = {
    selection: [],
    searching: false,
    values: []
  };

  componentDidMount() {
    if (this.props.initialValues) {
      this.updateSelection();
    }
  }

  componentDidUpdate(oldProps: IDropdownProps<T>, oldState: IDropdownState<T>) {
    if (oldProps.initialValues !== this.props.initialValues) {
      this.updateSelection();
    }
  }

  onClosePopover = () => {
    this.setState(_ => ({
      searchValue: ''
    }));
  };

  public get selection(): Array<IDropdownItem<T>> {
    return this.state.selection;
  }

  private updateSelection = (props = this.props) => {
    this.setState(_ => ({
      values: props.initialValues,
      selection: [...props.initialValues.filter(b => b.selected)]
    }));
  };

  private valSelected = (val: IDropdownItem<T>) => {
    const { multiple, onSelectionChanged, onValueSelected } = this.props;

    if (!multiple) {
      this.state.values.filter(i => i !== val).forEach(i => (i.selected = false));

      if (!!onSelectionChanged) {
        onSelectionChanged([val]);
      }
      this.setState(_ => ({ selection: [val] }));
    } else {
      this.setState(prevState => {
        const vals = prevState.selection;
        if (!vals.includes(val)) {
          vals.push(val);
        }

        if (!!onSelectionChanged) {
          onSelectionChanged(vals);
        }

        return { selection: vals };
      });
    }
    onValueSelected(val);
  };

  private valDeselected = (val: IDropdownItem<T>) => {
    const { multiple, disableDeselect, onSelectionChanged, onValueDeselected } = this.props;
    if (!multiple && !disableDeselect) {
      this.setState(_ => ({ selection: [] }));
      onValueDeselected(val);

      if (!!onSelectionChanged) {
        onSelectionChanged([]);
      }
    } else if (multiple) {
      this.setState(prevState => {
        const vals = prevState.selection;
        if (vals.includes(val)) {
          vals.splice(vals.indexOf(val), 1);
        }

        if (!!onSelectionChanged) {
          onSelectionChanged(vals);
        }

        return { selection: vals };
      });
      onValueDeselected(val);
    }
  };

  private onSearchChanged = (val: string) => {
    this.setState(_ => ({ searchValue: val }));
  };

  private renderSelectionBarItem = v => (
    <DropdownTag
      value={v}
      key={v.name || (v.value && v.value.toString())}
      onSelected={this.valSelected}
      onDeselected={this.valDeselected}
    />
  );

  private renderDropdownItems = (items: Array<IDropdownItem<T>>) =>
    items.map(sv => (
      <DropdownItem
        {...this.props}
        selectable
        value={sv}
        key={sv.name || (sv.value && sv.value.toString())}
        onSelected={this.valSelected}
        onDeselected={this.valDeselected}
      />
    ));

  private renderTag = (item: IDropdownItem<T>) => (
    <DropdownTag
      selectable
      value={item}
      key={item.name || (item.value && item.value.toString())}
      onSelected={this.valSelected}
      onDeselected={this.valDeselected}
    />
  );

  render() {
    const {
      className,
      multiple,
      search,
      selectionBar,
      initialValues,
      iconLeft,
      iconRight,
      selectAll,
      placeholder,
      tags,
      onValueSelected,
      onValueDeselected,
      onSelectionChanged,
      disabled,
      alignRight,
      disableDeselect,
      unselectable,
      onOpen,
      onClose,
      ...other
    } = this.props;

    const showIcon = !multiple && this.state.selection.length === 1 && this.state.selection[0].icon;
    const mustShowPlaceholder = this.state.selection.length === 0;

    const dropdownClass = cx('dropdown-button', className, { placeholder: mustShowPlaceholder });

    const items =
      !this.state.searching && !!this.state.values
        ? this.state.values.filter(
            b =>
              !this.state.searchValue ||
              ('' + b.value).toLowerCase().indexOf(this.state.searchValue.toLowerCase()) >= 0 ||
              translateItem(b)
                .toLowerCase()
                .indexOf(this.state.searchValue.toLowerCase()) >= 0
          )
        : [];

    const displayText = mustShowPlaceholder
      ? translateItem(placeholder)
      : translateItem(
          this.state.selection
            .reduce((acc, s) => {
              acc.push(s.display);
              return acc;
            }, [])
            .join(', ')
        );

    const searchBarComp = search ? <SearchBar value={this.state.searchValue} onSearchChanged={this.onSearchChanged} /> : null;

    const selectionBarComp = selectionBar && (
      <Grid className="tags-container selected-tags" items={this.state.selection} itemRender={this.renderSelectionBarItem} />
    );

    const menuClassName = cx('dropdown', {
      multiple,
      tags,
      'align-right': alignRight
    });

    return (
      <>
        {this.props.label && <Label>{translateItem(this.props.label)}</Label>}
        <WithPopover
          className={menuClassName}
          autoOpen
          autoClose
          required={this.props.required}
          closeOnMainClick
          disabled={this.props.disabled}
          onSelfClickClose={!multiple}
          onClosePopover={this.onClosePopover}
          mainComponent={
            <Button block className={dropdownClass} disabled={this.props.disabled} {...other}>
              {showIcon && <span className="dropdown-selection-icon">{this.state.selection[0].icon}</span>}
              <span className="button-text">{showIcon ? <span className="icon-with-text">{displayText}</span> : displayText}</span>
            </Button>
          }
        >
          <div className="dropdown-content">
            {searchBarComp}
            <ScrollableArea className="dropdown-options">
              {this.state.searching ? (
                <i key="searching">Searching</i>
              ) : tags ? (
                <Grid className="tags-container" items={items} itemRender={this.renderTag} />
              ) : (
                this.renderDropdownItems(items)
              )}
            </ScrollableArea>
          </div>
        </WithPopover>
        {selectionBarComp}
      </>
    );
  }
}
