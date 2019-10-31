import React, { ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import './grid.scss';
import { ScrollableArea } from '../scrollable-area/scrollable-area';

export interface IGridProps extends HTMLAttributes<HTMLDivElement> {
  items: any[];
  scrollable?: boolean;
  itemRender: (item: any, index: number) => ReactNode;
}

export const Grid: React.FC<IGridProps> = ({ items, itemRender, className, scrollable, ...other }) =>
  scrollable ? (
    <ScrollableArea className={cx('grid', className)} {...other}>
      {' '}
      {items.map((item, index) => itemRender(item, index))}
    </ScrollableArea>
  ) : (
    <div className={cx('grid', className)} {...other}>
      {items.map((item, index) => itemRender(item, index))}
    </div>
  );
