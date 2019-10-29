import React, { ReactNode, HTMLAttributes } from 'react';
import { ScrollableArea } from '../scrollable-area/scrollable-area';
import './list.scss';

export interface IListProps extends HTMLAttributes<{}> {
  items: any[];
  scrollable?: boolean;
  itemRender: (item: any, index: number) => ReactNode;
}

export const List: React.FC<IListProps> = ({ items, itemRender, scrollable }) =>
  scrollable ? (
    <ScrollableArea className="list">{items.map((item, index) => itemRender(item, index))}</ScrollableArea>
  ) : (
    <div className="list">{items.map((item, index) => itemRender(item, index))}</div>
  );
