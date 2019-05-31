import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <footer>
          <Translate contentKey="footer">Your footer</Translate>
        </footer>
      </Col>
    </Row>
  </div>
);

export default Footer;
