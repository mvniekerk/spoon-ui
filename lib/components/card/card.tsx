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
          <CardTitle>
            <h2>{title}</h2>
          </CardTitle>
          <CardSubtitle>
            <p>{subtitle}</p>
          </CardSubtitle>
          {actionComponent}
        </CardBody>
      </RCard>
    );
  }
}
