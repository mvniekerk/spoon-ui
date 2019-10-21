import React, { ReactNode } from 'react';
import { CardBody, Card as RCard, CardTitle, CardSubtitle } from 'reactstrap';
import './card.scss';

export interface ICardProps {
  image: ReactNode;
  title: string;
  subtitle: string;
  actionComponent: ReactNode;
}

export class Card extends React.Component<ICardProps> {
  render() {
    return (
      <RCard className="base-card">
        <CardBody>
          <div className="card-image">{this.props.image}</div>
          <CardTitle>
            <h2>{this.props.title}</h2>
          </CardTitle>
          <CardSubtitle>
            <p>{this.props.subtitle}</p>
          </CardSubtitle>
          {this.props.actionComponent}
        </CardBody>
      </RCard>
    );
  }
}
