import './dropdown-tag.scss';

import React from 'react';
import cx from 'classnames';
import { translateItem } from '../../util/translation';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import { getRootColorVariable } from '../color-variable-setter/color-variable-setter';
import { IDropdownItem } from './dropdown-item';

export interface IDropdownTagState {
  selected: boolean;
  color: string;
}

export interface IDropdownTagProps<T> {
  // this property defines whether the tag can be selected/deselected or only deselected
  selectable: boolean;
  value: IDropdownItem<T>;
  onSelected?: (val: IDropdownItem<T>) => void;
  onDeselected?: (val: IDropdownItem<T>) => void;
}

export const TAG_CHOICE = [1, 2, 3, 4].map(v => `tags-color-${v}`);
export const TAG_DESELECTED = '#d8e1e9';

export class DropdownTag<T> extends React.Component<IDropdownTagProps<T>, IDropdownTagState> {
  static defaultProps = {
    selectable: false,
    value: { name: 'Not set', display: '', value: -1 }
  };

  constructor(props: IDropdownTagProps<T>) {
    super(props);
    this.state = {
      selected: !!props.value && props.value.selected,
      color: getRootColorVariable(TAG_CHOICE[Math.floor(Math.random() * TAG_CHOICE.length)])
    };
  }

  handleOnClick = () => {
    const { value, selectable, onSelected, onDeselected } = this.props;
    const { selected } = this.state;

    value.selected = !selected;

    if (selectable) {
      if (selected && onDeselected) onDeselected(value);
      if (!selected && onSelected) onSelected(value);

      this.setState({
        selected: !selected
      });
    }

    if (!selectable) {
      if (selected && onDeselected) onDeselected(value);

      this.setState({
        selected: false
      });
    }
  };

  render() {
    const { selectable } = this.props;
    const { selected, color } = this.state;

    const className = cx('dropdown-tag', {
      'dropdown-tag-selected': this.props.selectable && this.props.value.selected
    });
    const displayText = translateItem(this.props.value);

    const rightTick =
      selectable && selected ? (
        <Check className="dropdown-tag-icon" />
      ) : !selectable && selected ? (
        <Clear className="dropdown-tag-icon" />
      ) : null;

    const colorStyle = { backgroundColor: selected ? color : TAG_DESELECTED };

    return (
      <button className={className} onClick={this.handleOnClick} style={colorStyle}>
        {displayText}
        {rightTick}
      </button>
    );
  }
}
