import React from 'react';
import { Container, Row, Col } from '../layout';
import './centered-layout.scss';

export class CenteredLayout extends React.Component<{}> {
  render() {
    return (
      <>
        <Container className="centered-layout" justify="center" align="center">
          <Row className="central-row">
            <Col md={12} justify="center" align="center">
              {this.props.children}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
