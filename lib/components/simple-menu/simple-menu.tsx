import React, { ReactNode, HTMLAttributes, MouseEvent } from 'react';
import './simple-menu.scss';
import cx from 'classnames';
import { translateItem } from '../../util/translation';
import { ActionIcon } from '../action-icon/action-icon';

interface ISimpleMenuProps extends HTMLAttributes<HTMLUListElement> {
  items: ISimpleMenuItem[];
}

export interface ISimpleMenuItem {
  label?: string;
  labelText?: string;
  actionIcon?: ReactNode;
  onClick: (e: MouseEvent) => void;
}

export class SimpleMenu extends React.Component<ISimpleMenuProps> {
  renderItem = (item: ISimpleMenuItem) => {
    const text = item.label ? translateItem(item.label) : item.labelText;

    return (
      <li className="simple-menu-item" key={text} onClick={item.onClick}>
        <span className="simple-menu-item-label">{text}</span>
        {item.actionIcon ? <ActionIcon className="simple-menu-icon" icon={item.actionIcon} /> : null}
      </li>
    );
  };

  renderItems = (items: ISimpleMenuItem[]) => items.map(this.renderItem);

  render() {
    const { className, items, ...other } = this.props;
    return (
      <ul className={cx('simple-menu', className)} {...other}>
        {this.renderItems(items)}
      </ul>
    );
  }
}
