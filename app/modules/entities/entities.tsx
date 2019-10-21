import React, { ReactNode, HTMLAttributes } from 'react';
import { Card, CardGroup, Row, Col, Label, Button, EntityCard, InfoCard, ActionIcon } from 'lib/components';
import TextFields from '@material-ui/icons/TextFields';
import Person from '@material-ui/icons/Person';
import Close from '@material-ui/icons/Close';

interface IEntitiesState {
  data: any[];
  actions: any[];
}

export class Entities extends React.Component<any, IEntitiesState> {
  state: IEntitiesState = {
    data: [
      { value: 'one' },
      { value: 'two' },
      { value: 'three' },
      { value: 'four' },
      { value: 'five' },
      { value: 'six' },
      { value: 'seven' },
      { value: 'eight' },
      { value: 'nine' },
      { value: 'ten' }
    ],
    actions: [
      {
        label: 'menus.selection',
        onClick: () => {
          alert('menu item onClick');
        }
      },
      {
        label: 'menus.navigation',
        onClick: () => {
          alert('menu item onClick');
        }
      }
    ]
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <Label>Card</Label>
            <Card image={<TextFields />} title={'Title'} subtitle={'Subtitle'} actionComponent={<Button>Button</Button>} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>CardGroup</Label>
            <CardGroup>
              <Card image={<TextFields />} title={'Title 1'} subtitle={'Subtitle 1'} actionComponent={<Button>Button</Button>} />
              <Card image={<TextFields />} title={'Title 2'} subtitle={'Subtitle 2'} actionComponent={<Button>Button</Button>} />
              <Card image={<TextFields />} title={'Title 3'} subtitle={'Subtitle 3'} actionComponent={<Button>Button</Button>} />
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Label>EntityCard</Label>
            <EntityCard
              title={'User'}
              icon={<Person />}
              bodyComponent={<Button>Button</Button>}
              actionComponent={<ActionIcon icon={<Close />} />}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Label>EntityCard Small</Label>
            <EntityCard small title={'User'} icon={<Person />} actionComponent={<ActionIcon icon={<Close />} />} />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Label>InfoCard</Label>
            <InfoCard id="info-1" title="User" image={<Person />} popoverContent={<EntityCard small title={'User'} icon={<Person />} />} />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Label>InfoCard with search</Label>
            <InfoCard
              id="info-2"
              title="User with search"
              image={<Person />}
              search
              popoverContent={<EntityCard title={'User'} icon={<Person />} bodyComponent={<Button>Button</Button>} small />}
            />
          </Col>
        </Row>
      </>
    );
  }
}
