import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';

import './scrollable-area.scss';

export interface IScrollableAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tag?: ElementType;
}

export const ScrollableArea: React.FC<IScrollableAreaProps> = ({ children, className, tag: Tag = 'div', ...other }) => (
  <Scrollbars className="scrollable-area" universal autoHeight={Tag === 'div'} hideTracksWhenNotNeeded>
    <Tag className={cx('', className)} {...other}>
      {children}
    </Tag>
  </Scrollbars>
);
