import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col } from 'reactstrap';

export default class Home extends React.Component {
  render() {
    return (
      <Row>
        <Col md="9">
          <h1>Spoon UI</h1>
          <p>
            Link to <a href="https://github.com/GrindrodBank/spoon-ui">Spoon UI GitHub repository</a>
          </p>
        </Col>
      </Row>
    );
  }
}
