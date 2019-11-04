import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import cx from 'classnames';
import './scrollable-area.scss';

export interface IScrollableAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tag?: ElementType;
}

export const ScrollableArea: React.FC<IScrollableAreaProps> = ({ children, className, tag: Tag = 'div', ...other }) => (
  <Tag className={cx('scrollable-area', className)} {...other}>
    {children}
  </Tag>
);
