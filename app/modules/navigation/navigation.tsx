import './navigation.scss';

import React from 'react';
import { Row, Col, Nav, NavItem, NavLink, ButtonGroup, UncontrolledTooltip, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Info from '@material-ui/icons/Info';
import Edit from '@material-ui/icons/Edit';
import SubdirectoryArrowRight from '@material-ui/icons/SubdirectoryArrowRight';

import { Button, Alert, ItemsPerPage, Pagination, ProgressBar, Progression, ProgressionItem } from 'lib/components';

export class Navigation extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col md="8">
            <div className="small-header">Tabs</div>

            <Col md="8">
              <Nav tabs>
                <NavItem>
                  <NavLink className="active">Tab 1</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Tab 2</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Tab 3</NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <ButtonGroup>
                <Button>Left</Button>
                <Button color="primary">Middle</Button>
                <Button>Right</Button>
              </ButtonGroup>
            </Col>
          </Col>
          <Col md="4">
            <div className="small-header">Tooltips</div>
            <Info id="tooltip1" style={{ color: '#c5d0de' }} />
            <UncontrolledTooltip target="tooltip1" placement="top">
              Tooltip
            </UncontrolledTooltip>
          </Col>
          <Col md="12">
            <div className="small-header">Notifications</div>
            <Row>
              <Col md="6">
                <Alert color="success" icon="info">
                  Success! This is a positive notification
                </Alert>
              </Col>
              <Col md="6">
                <Alert color="warning" icon="warning">
                  Warning. Loading of this page taking a way too long.
                </Alert>
              </Col>
              <Col md="6">
                <Alert color="info" icon="info">
                  All servers are now running smoothly again! Thanks.
                </Alert>
              </Col>
              <Col md="6">
                <Alert color="danger" icon="error">
                  Error. Can’t connect to the platform.
                </Alert>
              </Col>
            </Row>
          </Col>
          <Col md="4">
            <div className="small-header">Breadcrumb</div>

            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag="a" href="#">
                Home
              </BreadcrumbItem>
              <BreadcrumbItem tag="a" href="#">
                Library
              </BreadcrumbItem>
              <BreadcrumbItem tag="a" href="#">
                Data
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Bootstrap
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md="4">
            <div className="small-header" style={{ marginBottom: '16px' }}>
              Progress bar
            </div>
            <ProgressBar showProgressCounter={false} />
            <br />
            <ProgressBar showProgressCounter={false} label="Label, no value" />
            <br />
            <ProgressBar />
            <br />
            <ProgressBar label="Label, value, warning color" color="warning" />
          </Col>
          <Col md="4">
            <div className="small-header" style={{ marginBottom: '16px' }}>
              Pagination
            </div>
            <Pagination />
          </Col>
          <Col md="4">
            <div className="small-header">Progression</div>
            <Progression>
              <ProgressionItem done>Step 1</ProgressionItem>
              <ProgressionItem done>Step 2</ProgressionItem>
              <ProgressionItem current>Step 3</ProgressionItem>
            </Progression>
            <Progression>
              <ProgressionItem current step={1}>
                Step 1
              </ProgressionItem>
              <ProgressionItem step={2}>Step 2</ProgressionItem>
              <ProgressionItem step={3}>Step 3</ProgressionItem>
            </Progression>
          </Col>
          <Col md="6">
            <div className="small-header">Progression vertical</div>
            <Progression vertical>
              <ProgressionItem step={1} current icon={<Edit />}>
                Personal Details
              </ProgressionItem>
              <ProgressionItem step={2} done>
                Contact Details
              </ProgressionItem>
              <ProgressionItem step={3}>Client Profile</ProgressionItem>
              <ProgressionItem step={4} icon={<SubdirectoryArrowRight />}>
                Submit for approval
              </ProgressionItem>
            </Progression>
          </Col>
          <Col md="4">
            <ItemsPerPage defaultPerPage={20} />
          </Col>
        </Row>
      </>
    );
  }
}
