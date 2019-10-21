import React, { ReactNode, HTMLAttributes } from 'react';
import './grid.scss';
import { ScrollableArea } from '../scrollable-area/scrollable-area';

export interface IGridProps extends HTMLAttributes<{}> {
  items: any[];
  scrollable?: boolean;
  itemRender: (item: any, index: number) => ReactNode;
}

export const Grid: React.FC<IGridProps> = ({ items, itemRender, scrollable }) =>
  scrollable ? (
    <ScrollableArea className="grid"> {items.map((item, index) => itemRender(item, index))}</ScrollableArea>
  ) : (
    <div className="grid">{items.map((item, index) => itemRender(item, index))}</div>
  );
