import React, { ReactNode, HTMLAttributes, MouseEvent } from 'react';
import './menu.scss';
import { Row, Col } from '../layout';
import { translateItem } from '../../util/translation';
import { ActionIcon } from '../action-icon/action-icon';

interface IMenuProps extends HTMLAttributes<{}> {
  items: IMenuItem[];
}

export interface IMenuItem {
  label?: string;
  labelText?: string;
  actionIcon?: ReactNode;
  onClick: (e: MouseEvent) => void;
}

export class Menu extends React.Component<IMenuProps> {
  renderItem = item => {
    const text = item.label ? translateItem(item.label) : item.labelText;

    return (
      <Row tag="li" className="menu-item" justify="between" key={text} onClick={item.onClick}>
        <Col align="center">{text}</Col>
        {item.actionIcon ? (
          <Col align="center">
            <ActionIcon icon={item.actionIcon} onClick={item.onClick} />
          </Col>
        ) : null}
      </Row>
    );
  };

  renderItems = () => this.props.items.map(this.renderItem);

  render() {
    return <ul className="menu">{this.renderItems()}</ul>;
  }
}
