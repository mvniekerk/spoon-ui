import React, { ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import { ScrollableArea } from '../scrollable-area/scrollable-area';
import './list.scss';

export interface IListProps extends HTMLAttributes<HTMLDivElement> {
  items: any[];
  scrollable?: boolean;
  itemRender: (item: any, index: number) => ReactNode;
}

export const List: React.FC<IListProps> = ({ items, itemRender, scrollable, className, ...other }) =>
  scrollable ? (
    <ScrollableArea className={cx('list', className)} {...other}>
      {items.map((item, index) => itemRender(item, index))}
    </ScrollableArea>
  ) : (
    <div className={cx('list', className)} {...other}>
      {items.map((item, index) => itemRender(item, index))}
    </div>
  );
