import React, { ReactElement } from 'react';
import './entity-card.scss';
import { Card, CardBody, CardTitle, CardProps } from '../external';

export interface IEntityCardProps extends CardProps {
  title: string;
  small?: boolean;
  icon?: ReactElement;
  bodyComponent?: ReactElement;
  actionComponent?: ReactElement;
}

export const EntityCard: React.FC<IEntityCardProps> = ({ icon, id, title, small, bodyComponent, actionComponent, ...other }) => (
  <Card id={id} className={`entity-card${small ? ' small' : ''}`} {...other}>
    <CardBody>
      {icon
        ? React.cloneElement(icon, {
            className: icon.props.className ? icon.props.className + ' entity-card-icon' : 'entity-card-icon'
          })
        : null}
      <CardTitle>{small ? title : <h2>{title}</h2>}</CardTitle>
      {bodyComponent ? <div className="bodyComponent">{bodyComponent}</div> : null}
      {actionComponent ? <div className="actionComponent">{actionComponent}</div> : null}
    </CardBody>
  </Card>
);
