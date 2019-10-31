import React, { ReactNode, HTMLAttributes } from 'react';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import './scrollable-area.scss';

export interface IScrollableAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ScrollableArea: React.FC<IScrollableAreaProps> = ({ children, className, ...other }) => (
  <PerfectScrollbar className={className} {...other}>
    {children}
  </PerfectScrollbar>
);
