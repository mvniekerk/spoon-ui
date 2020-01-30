import React, { ReactNode } from 'react';
import { CardBody, Card as RCard, CardTitle, CardSubtitle, CardProps } from 'reactstrap';
import cx from 'classnames';
import './card.scss';

export interface ICardProps extends CardProps {
  image: ReactNode;
  title: string;
  subtitle: string;
  actionComponent: ReactNode;
}

export class Card extends React.Component<ICardProps> {
  render() {
    const { image, title, subtitle, actionComponent, className, ...other } = this.props;
    return (
      <RCard className={cx('base-card', className)} {...other}>
        <CardBody>
          <div className="card-image">{image}</div>
          <CardSubtitle>
            <p>{subtitle}</p>
          </CardSubtitle>
          <CardTitle>
            <h3>{title}</h3>
          </CardTitle>
          {actionComponent}
        </CardBody>
      </RCard>
    );
  }
}
