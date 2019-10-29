import './dropdown-search-bar.scss';
import React, { ChangeEvent, ReactNode } from 'react';
import { Expandable } from '../expandable/expandable';
import SearchRounded from '@material-ui/icons/SearchRounded';
import { FormGroup } from '../layout';
import { Input } from '../external';

export interface IDropdownSearchBarProps {
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
    return (
      <Expandable
        className="dropdown-search-bar"
        mainComponent={
          <div>
            <SearchRounded className="dropdown-search--search-icon" />
            <Input
              id={this.props.id}
              className="dropdown-search--main-search"
              placeholder={this.props.placeholder}
              value={this.state.search}
              onChange={this.onSearchChange}
              disabled={this.props.disabled}
            />
          </div>
        }
      >
        {this.props.children}
      </Expandable>
    );
  }
}
