import React, { ReactNode, HTMLAttributes, MouseEvent } from 'react';
import './simple-menu.scss';
import { Row, Col } from '../layout';
import { translateItem } from '../../util/translation';
import { ActionIcon } from '../action-icon/action-icon';

interface ISimpleMenuProps extends HTMLAttributes<{}> {
  items: ISimpleMenuItem[];
}

export interface ISimpleMenuItem {
  label?: string;
  labelText?: string;
  actionIcon?: ReactNode;
  onClick: (e: MouseEvent) => void;
}

export class SimpleMenu extends React.Component<ISimpleMenuProps> {
  renderItem = item => {
    const text = item.label ? translateItem(item.label) : item.labelText;

    return (
      <li className="simple-menu-item" key={text} onClick={item.onClick}>
        <span className="simple-menu-item-label">{text}</span>
        {item.actionIcon ? <ActionIcon className="simple-menu-icon" icon={item.actionIcon} /> : null}
      </li>
    );
  };

  renderItems = () => this.props.items.map(this.renderItem);

  render() {
    return <ul className="simple-menu">{this.renderItems()}</ul>;
  }
}
