import './tag-button.scss';
import React from 'react';

export interface ITagButtonProps {
  selected?: boolean;

  iconLeft?: boolean;
  iconRight?: boolean;
  onSelected?: (val: boolean, sender: TagButton) => void;
  onDeselected?: (val: boolean, sender: TagButton) => void;

  icon?: string;
  iconUrl?: string;
  splitTop?: boolean;
  tick: string;
}

export interface ITagButtonState {
  selected: boolean;
}

export default class TagButton extends React.Component<ITagButtonProps, ITagButtonState> {
  static defaultProps: ITagButtonProps = {
    selected: false,
    tick: 'check'
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }

  handleOnClick = () => {
    const isSelected = !this.state.selected;
    this.setState(_ => ({ selected: false }));
    if (isSelected && this.props.onSelected) {
      this.props.onSelected(isSelected, this);
    } else if (!isSelected && this.props.onDeselected) {
      this.props.onDeselected(isSelected, this);
    } else {
      console.warn('Ignoring click on ', this);
    }
  };

  render() {
    const className =
      'dropdown-item' +
      (this.state.selected ? ' dropdown-item-selected' : '') +
      (this.props.iconLeft ? ' has-icon-left' : '') +
      (this.props.iconRight ? ' has-icon-right' : '');
    const handleOnClick = this.handleOnClick;
    const itemContainerClass = 'tag-button-container' + (this.state.selected ? ' selected' : '');
    const rightTick = this.state.selected ? <i className="material-icons dropdown-icon select-icon">{this.props.tick}</i> : null;
    return (
      <div className={itemContainerClass} onClick={handleOnClick}>
        <div className="button-container">
          <button className={className}>
            {!!this.props.iconLeft ? <i className="material-icons dropdown-icon">{this.props.icon}</i> : null}
            {this.props.children}
            {!!this.props.iconRight ? <i className="material-icons dropdown-icon">{this.props.icon}</i> : null}
          </button>
        </div>
        <div className="select-icon-container">{rightTick}</div>
      </div>
    );
  }
}
