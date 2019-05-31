import './table-header.scss';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';
import UnsortedIcon from '@material-ui/icons/UnfoldMore';

export interface ITableHeaderProps {
  sort?: 'ascending' | 'descending' | 'unsorted';
  sortClicked?: (sort: 'ascending' | 'descending' | 'unsorted') => void;
}

const Descending = (props: ITableHeaderProps) => props.sort === 'descending' && <ExpandMoreIcon className="sort-icon" />;
const Ascending = (props: ITableHeaderProps) => props.sort === 'ascending' && <ExpandLessIcon className="sort-icon" />;
const Unsorted = (props: ITableHeaderProps) => props.sort === 'unsorted' && <UnsortedIcon className="sort-icon" />;

export class TableHeader extends React.Component<ITableHeaderProps> {
  constructor(props: any) {
    super(props);
    this.onSortClicked = this.onSortClicked.bind(this);
  }

  onSortClicked() {
    if (!!this.props.sortClicked) {
      this.props.sortClicked(this.props.sort);
    }
  }

  render() {
    const className = !!this.props.sort ? 'sortable' : '';
    return (
      <th onClick={this.onSortClicked} className={className}>
        <Descending {...this.props} />
        <Ascending {...this.props} />
        <Unsorted {...this.props} />
        {this.props.children}
      </th>
    );
  }
}

export default TableHeader;
