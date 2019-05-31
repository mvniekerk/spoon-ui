import React from 'react';
import RPaginate from 'react-paginate';

export interface IPaginationProps {
  pageCount: number;
  onPageChange: Function;
  initialPage: number;
}

export class Pagination extends React.Component<IPaginationProps> {
  static defaultProps: IPaginationProps = {
    pageCount: 10,
    onPageChange: () => {},
    initialPage: 0
  };

  render() {
    return (
      <RPaginate
        {...this.props}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        previousLinkClassName="page-link left"
        previousLabel=""
        nextClassName="page-item"
        nextLinkClassName="page-link right"
        nextLabel=""
        breakClassName="page-item"
        breakLinkClassName="page-link"
        breakLabel="..."
        extraAriaContext="..."
        marginPagesDisplayed="1"
      />
    );
  }
}

export default Pagination;
