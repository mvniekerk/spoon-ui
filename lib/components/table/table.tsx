import React, { ReactNode, HTMLAttributes } from 'react';
import { Table as RTable, Card } from 'reactstrap';
import { TableHeader } from './table-header';
import { Row, Col } from '../layout';

interface ITableProps extends HTMLAttributes<{}> {
  tableHeaderData: string[];
  tableRowData: any[];
  renderRow: (any) => ReactNode;
}

export class Table extends React.Component<ITableProps> {
  renderTableHeaders = () => this.props.tableHeaderData.map(tableHeader => <TableHeader key={tableHeader}>{tableHeader}</TableHeader>);

  renderTableRows = () => this.props.tableRowData.map(this.props.renderRow);

  render() {
    return (
      <Card>
        <Row>
          <Col>
            <RTable>
              <thead>
                <tr>{this.renderTableHeaders()}</tr>
              </thead>
              <tbody>{this.renderTableRows()}</tbody>
            </RTable>
          </Col>
        </Row>
      </Card>
    );
  }
}
