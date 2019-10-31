import './dropdown-search-bar.scss';
import React, { ChangeEvent, ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import { Expandable } from '../expandable/expandable';
import SearchRounded from '@material-ui/icons/SearchRounded';
import { Input } from '../external';

export interface IDropdownSearchBarProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  onSearchChanged: (search: string) => void;
  disabled?: boolean;
  placeholder?: string;
  children?: ReactNode;
}

export interface IDropdownSearchBarState {
  search: string;
}

export class DropdownSearchBar extends React.Component<IDropdownSearchBarProps, IDropdownSearchBarState> {
  state: IDropdownSearchBarState = {
    search: ''
  };

  constructor(props: any) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    this.setState({ search });
    this.props.onSearchChanged(search);
  }

  render() {
    const { id, disabled, placeholder, children, className, ...other } = this.props;
    return (
      <Expandable
        className={cx('dropdown-search-bar', className)}
        mainComponent={
          <div>
            <SearchRounded className="dropdown-search--search-icon" />
            <Input
              id={id}
              className="dropdown-search--main-search"
              placeholder={placeholder}
              value={this.state.search}
              onChange={this.onSearchChange}
              disabled={disabled}
            />
          </div>
        }
        {...other}
      >
        {children}
      </Expandable>
    );
  }
}
