import './dropdown-item.scss';

import React from 'react';
import cx from 'classnames';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';
import Check from '@material-ui/icons/Check';

export interface IDropdownItem<T> extends ITranslatedSelectableValue<T> {
  icon?: JSX.Element;
  iconUrl?: string;
  splitTop?: boolean;
}

export interface IDropdownItemState {
  selected: boolean;
}

export interface IDropdownItemProps<T> {
  iconLeft?: boolean;
  iconRight?: boolean;
  selectable: boolean;
  unselectable: 'on' | 'off';
  value: IDropdownItem<T>;
  onSelected?: (val: IDropdownItem<T>) => void;
  onDeselected?: (val: IDropdownItem<T>) => void;
}

export class DropdownItem<T> extends React.Component<IDropdownItemProps<T>, IDropdownItemState> {
  static defaultProps = {
    selectable: false,
    value: { name: 'Not set', display: '', value: -1 },
    unselectable: 'on'
  };

  constructor(props: IDropdownItemProps<T>) {
    super(props);
    this.state = {
      selected: !!props.value && props.value.selected
    };
  }

  handleOnClick = () => {
    if (this.props.value.selected && !this.props.unselectable) {
      return;
    }

    const isSelected = !this.props.value.selected;
    this.props.value.selected = isSelected;
    this.setState(prevState => {
      return { selected: false };
    });
    if (isSelected && this.props.onSelected) {
      this.props.onSelected(this.props.value);
    } else if (!isSelected && this.props.onDeselected) {
      this.props.onDeselected(this.props.value);
    } else {
      console.warn('Ignoring click on ', this);
    }
  };

  render() {
    const { selectable, iconLeft, iconRight, value } = this.props;
    const { selected } = this.state;

    const className = cx('dropdown-item', {
      'dropdown-item-selected': selectable && value.selected,
      'has-icon-left': iconLeft,
      'has-icon-right': iconRight,
      'has-split-top': value.splitTop
    });

    const displayText = translateItem(value);
    const itemContainerClass = cx('dropdown-item-container no-tag', {
      selected: value.selected
    });

    const rightTick = value.selected ? <Check className="material-icons dropdown-icon select-icon" /> : null;

    return (
      <div className={itemContainerClass} onClick={this.handleOnClick}>
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
