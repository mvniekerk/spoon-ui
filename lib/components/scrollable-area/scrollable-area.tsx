import React, { ReactNode, HTMLAttributes } from 'react';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import './scrollable-area.scss';

export interface IScrollableAreaProps extends HTMLAttributes<{}> {
  children: ReactNode;
}

export const ScrollableArea: React.FC<IScrollableAreaProps> = ({ children, className }) => (
  <PerfectScrollbar className={className}>{children}</PerfectScrollbar>
);
