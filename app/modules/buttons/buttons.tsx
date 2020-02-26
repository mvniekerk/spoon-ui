import './buttons.scss';

import React from 'react';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import { ToggleButtonGroup } from 'lib/components/button/toggle-button-group';
import { Button, ActionIcon } from 'lib/components';

import Send from '@material-ui/icons/Send';

export class Buttons extends React.Component {
  render() {
    return (
      <div className="example-buttons">
        <Row>
          <Col md="3">
            <Button color="primary">Text</Button>
            <Button color="primary" iconLeft={<Send />}>
              Text
            </Button>
            <Button color="primary" iconRight={<Send />}>
              Text
            </Button>
            <Button color="primary" iconLeft={<Send />} disabled>
              Text
            </Button>
            <Button color="primary" iconRight={<Send />} disabled>
              Text
            </Button>
          </Col>
          <Col md="3">
            <Button color="secondary">Text</Button>
            <Button color="secondary" iconLeft={<Send />}>
              Text
            </Button>
            <Button color="secondary" iconRight={<Send />}>
              Text
            </Button>
            <Button color="secondary" disabled iconLeft={<Send />}>
              Text
            </Button>
            <Button color="secondary" disabled iconRight={<Send />}>
              Text
            </Button>
          </Col>
          <Col md="3">
            <Button color="link">Text</Button>
            <Button color="link" iconLeft={<Send />}>
              Text
            </Button>
            <Button color="link" iconRight={<Send />}>
              Text
            </Button>
            <Button color="link" disabled iconLeft={<Send />}>
              Text
            </Button>
            <Button color="link" disabled iconRight={<Send />}>
              Text
            </Button>
          </Col>
          <Col md="3">
            <Button color="dark">Text</Button>
            <Button color="dark" iconLeft={<Send />}>
              Text
            </Button>
            <Button color="dark" iconRight={<Send />}>
              Text
            </Button>
            <Button color="dark" disabled iconLeft={<Send />}>
              Text
            </Button>
            <Button color="dark" disabled iconRight={<Send />}>
              Text
            </Button>
          </Col>
          <Col md="3">
            <Button size="lg">Large Button</Button>
            <Button color="primary" size="lg">
              Large Button
            </Button>
          </Col>
          <Col>
            <Label>ActionIcon</Label>
            <FormGroup>
              {/* tslint:disable:jsx-no-lambda */}
              <ActionIcon
                icon={<Send />}
                onClick={() => {
                  alert('ActionIcon onClick');
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block size="lg">
              full button
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Toggle Button Group</Label>
            <ToggleButtonGroup values={[{ value: 'First' }, { value: 'Second' }, { value: 'Third' }]} />
          </Col>
        </Row>
      </div>
    );
  }
}
