import './dropdown-item.scss';

import React from 'react';
import { connect } from 'react-redux';
import { ITextTranslationAndValue, translateItem } from '../../util/translation';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import { getRootColorVariable } from '../color-variable-setter/color-variable-setter';

export interface IDropdownItemState {
  selected: boolean;
  color: string;
}

export interface IDropdownItemProps<T> {
  iconLeft?: boolean;
  iconRight?: boolean;
  selectable: boolean;
  tag: boolean;
  value: ITextTranslationAndValue<T>;
  onSelected?: (val: ITextTranslationAndValue<T>, sender: DropdownItem<T>) => void;
  onDeselected?: (val: ITextTranslationAndValue<T>, sender: DropdownItem<T>) => void;
  checkNotCross: boolean;
}

export const TAG_CHOICE = [1, 2, 3, 4].map(v => `tags-color-${v}`);
export const TAG_DESELECTED = '#d8e1e9';

export class DropdownItem<T> extends React.Component<IDropdownItemProps<T>, IDropdownItemState> {
  static defaultProps = {
    tag: false,
    selectable: false,
    value: { name: 'Not set', display: '', value: -1 },
    checkNotCross: true
  };

  state: IDropdownItemState = {
    selected: false,
    color: getRootColorVariable(TAG_CHOICE[Math.floor(Math.random() * TAG_CHOICE.length)])
  };

  constructor(props: IDropdownItemProps<T>) {
    super(props);
    this.setState(_ => ({ selected: !!props.value && props.value.selected }));
  }

  handleOnClick = () => {
    const isSelected = !this.props.value.selected;
    this.props.value.selected = isSelected;
    this.setState(prevState => {
      return { selected: false };
    });
    if (isSelected && this.props.onSelected) {
      this.props.onSelected(this.props.value, this);
    } else if (!isSelected && this.props.onDeselected) {
      this.props.onDeselected(this.props.value, this);
    } else {
      console.warn('Ignoring click on ', this);
    }
  };

  render() {
    const className =
      'dropdown-item' +
      (this.props.selectable && this.props.value.selected ? ' dropdown-item-selected' : '') +
      (this.props.iconLeft ? ' has-icon-left' : '') +
      (this.props.iconRight ? ' has-icon-right' : '') +
      (this.props.value.splitTop ? ' has-split-top' : '');
    const handleOnClick = this.handleOnClick;
    const displayText = translateItem(this.props.value);
    const itemContainerClass =
      'dropdown-item-container' + (this.props.value.selected ? ' selected' : '') + (this.props.tag ? ' tag' : ' no-tag');
    const rightTick = this.props.value.selected ? (
      this.props.checkNotCross ? (
        <Check className="material-icons dropdown-icon select-icon" />
      ) : (
        <Clear className="material-icons dropdown-icon select-icon" />
      )
    ) : null;
    const color = this.props.tag ? { backgroundColor: this.props.value.selected ? this.state.color : TAG_DESELECTED } : {};

    return (
      <div className={itemContainerClass} onClick={handleOnClick} style={{ ...color }}>
        <div className="button-container">
          <button className={className}>
            {!!this.props.iconLeft ? <div className="material-icons dropdown-icon">{this.props.value.icon}</div> : null}
            <div className="button-content">
              {displayText}
              {this.props.children}
            </div>
            {!!this.props.iconRight ? <div className="material-icons dropdown-icon">{this.props.value.icon}</div> : null}
            {<div className="select-icon-container">{rightTick}</div>}
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(DropdownItem);
