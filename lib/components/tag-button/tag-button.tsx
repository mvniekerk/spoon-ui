import './tag-button.scss';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';

export interface ITagButtonProps extends HTMLAttributes<HTMLButtonElement> {
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

export class TagButton extends React.Component<ITagButtonProps, ITagButtonState> {
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
    const { className, iconLeft, iconRight, icon, tick, children, ...other } = this.props;

    const btnClassName = cx(className, 'dropdown-item', {
      'dropdown-item-selected': this.state.selected,
      'has-icon-left': iconLeft,
      'has-icon-right': iconRight
    });

    const itemContainerClass = cx('tag-button-container', { selected: this.state.selected });
    const rightTick = this.state.selected ? <i className="material-icons dropdown-icon select-icon">{tick}</i> : null;
    return (
      <div className={itemContainerClass} onClick={this.handleOnClick}>
        <div className="button-container">
          <button className={btnClassName} {...other}>
            {!!iconLeft ? <i className="material-icons dropdown-icon">{icon}</i> : null}
            {children}
            {!!iconRight ? <i className="material-icons dropdown-icon">{icon}</i> : null}
          </button>
        </div>
        <div className="select-icon-container">{rightTick}</div>
      </div>
    );
  }
}
