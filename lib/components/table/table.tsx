import React, { ReactNode, HTMLAttributes } from 'react';
import { Table as RTable, Card, TableProps } from 'reactstrap';
import { TableHeader } from './table-header';
import { Row, Col } from '../layout';

interface ITableProps extends TableProps {
  tableHeaderData: string[];
  tableRowData: any[];
  renderRow: (any) => ReactNode;
}

export class Table extends React.Component<ITableProps> {
  renderTableHeaders = tableHeaderData => tableHeaderData.map(tableHeader => <TableHeader key={tableHeader}>{tableHeader}</TableHeader>);

  renderTableRows = (tableRowData, renderRow) => tableRowData.map(renderRow);

  render() {
    const { tableHeaderData, tableRowData, renderRow, ...other } = this.props;
    return (
      <Card>
        <Row>
          <Col>
            <RTable {...other}>
              <thead>
                <tr>{this.renderTableHeaders(tableHeaderData)}</tr>
              </thead>
              <tbody>{this.renderTableRows(tableRowData, renderRow)}</tbody>
            </RTable>
          </Col>
        </Row>
      </Card>
    );
  }
}
