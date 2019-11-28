import '../context-menu/context-menu.scss';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import { ISimpleMenuItem, SimpleMenu } from '../simple-menu/simple-menu';
import { ActionIcon } from '../action-icon/action-icon';
import { WithPopover } from '../with-popover/with-popover';
import MoreVert from '@material-ui/icons/MoreVert';

export interface IContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  items: ISimpleMenuItem[];
}

export class ContextMenu extends React.Component<IContextMenuProps> {
  render() {
    const { className, items } = this.props;
    const menuClassname = cx('context-menu', className);
    return (
      <WithPopover
        className={menuClassname}
        noOpener
        autoOpen
        autoClose
        closeOnMainClick
        onSelfClickClose
        mainComponent={
          <button>
            <ActionIcon className="context-menu-icon" icon={<MoreVert />} />
          </button>
        }
      >
        <SimpleMenu items={items} />
      </WithPopover>
    );
  }
}
