import './buttons.scss';

import React from 'react';
import { Row, Col } from 'reactstrap';

/* tslint:disable:no-submodule-imports */
import { Button } from 'lib/components';
/* tslint:enable:no-submodule-imports */

import Send from '@material-ui/icons/Send';

export default class Buttons extends React.Component {
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
            <Button color="green">Text</Button>
            <Button color="green" iconLeft={<Send />}>
              Text
            </Button>
            <Button color="green" iconRight={<Send />}>
              Text
            </Button>
            <Button color="green" disabled iconLeft={<Send />}>
              Text
            </Button>
            <Button color="green" disabled iconRight={<Send />}>
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
        </Row>
      </div>
    );
  }
}
