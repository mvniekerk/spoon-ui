import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import cx from 'classnames';
import './scrollable-area.scss';
import { Scrollbars } from 'react-custom-scrollbars';

export interface IScrollableAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tag?: ElementType;
}

export const ScrollableArea: React.FC<IScrollableAreaProps> = ({ children, className, tag: Tag = 'div', ...other }) => (
  <Scrollbars className="scrollable-area" universal autoHeight={Tag === 'div'}>
    <Tag className={cx('', className)} {...other}>
      {children}
    </Tag>
  </Scrollbars>
);
