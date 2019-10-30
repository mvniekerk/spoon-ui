import './tables.scss';

import React from 'react';
import { Row, Col, Table, Card } from 'reactstrap';
import { Dropdown, Button, TagButton, TableHeader } from 'lib/components';
import MoreVert from '@material-ui/icons/MoreVert';
import SaveAltRounded from '@material-ui/icons/SaveAltRounded';

export class Tables extends React.Component {
  render() {
    return (
      <Card>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <TableHeader sort={'unsorted'}>Name</TableHeader>
                  <TableHeader sort={'descending'}>Description</TableHeader>
                  <TableHeader sort={'ascending'}>Tag</TableHeader>
                  <th />
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Account Balances</th>
                  <td>Lorem ipsum doret samet consequat electur…</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TagButton>Tag name</TagButton>
                      <TagButton>Tag name</TagButton>
                    </div>
                  </td>
                  <td>
                    <Button color="primary">button</Button>
                  </td>
                  <td>
                    <Dropdown placeholder="Actions" />
                  </td>
                  <td>
                    <SaveAltRounded style={{ color: '#c5d0de' }} />
                  </td>
                  <td>
                    <MoreVert style={{ color: '#c5d0de' }} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Accounts on Notice</th>
                  <td>Lorem ipsum doret samet consequat electur…</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TagButton>Tag name</TagButton>
                      <TagButton>Tag name</TagButton>
                    </div>
                  </td>
                  <td>
                    <Button color="primary">button</Button>
                  </td>
                  <td>
                    <Dropdown placeholder="Actions" />
                  </td>
                  <td>
                    <SaveAltRounded style={{ color: '#c5d0de' }} />
                  </td>
                  <td>
                    <MoreVert style={{ color: '#c5d0de' }} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Agent Capital Balances</th>
                  <td>Lorem ipsum doret samet consequat electur…</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TagButton>Tag name</TagButton>
                      <TagButton>Tag name</TagButton>
                    </div>
                  </td>
                  <td>
                    <Button color="primary">button</Button>
                  </td>
                  <td>
                    <Dropdown placeholder="Actions" />
                  </td>
                  <td>
                    <SaveAltRounded style={{ color: '#c5d0de' }} />
                  </td>
                  <td>
                    <MoreVert style={{ color: '#c5d0de' }} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    );
  }
}
