import React, { ReactElement } from 'react';
import './info-card.scss';
import { WithPopover } from '../with-popover/with-popover';
import { Container, Row, Col } from '../layout';
import { EntityCard } from '../entity-card/entity-card';
import SearchBar from '../search-bar/search-bar';

export interface IInfoCardProps {
  id: string;
  title: string;
  popoverContent: ReactElement;
  image?: ReactElement;
  search?: boolean;
  onSearchChanged?: (value: string) => void;
}
interface IInfoCardState {
  open: boolean;
}

/**
 * This component shows a card with title and image and have an expandable area
 * which shows additional details, maybe with search field.
 * The additional details and how they are searched should be defined from parent.
 */
export class InfoCard extends React.Component<IInfoCardProps, IInfoCardState> {
  renderSearch = () =>
    !this.props.search ? null : (
      <Row>
        <Col>
          <SearchBar onSearchChanged={this.props.onSearchChanged} />
          <hr />
        </Col>
      </Row>
    );

  render() {
    return (
      <WithPopover
        autoOpen
        closeOnMainClick
        className="info-card"
        target={this.props.id}
        mainComponent={<EntityCard id={this.props.id} icon={this.props.image} title={this.props.title} />}
      >
        <Container fluid>
          {this.renderSearch()}
          {this.props.popoverContent}
        </Container>
      </WithPopover>
    );
  }
}
