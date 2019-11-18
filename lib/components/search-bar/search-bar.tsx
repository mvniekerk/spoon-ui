import './search-bar.scss';
import React, { ChangeEvent } from 'react';
import cx from 'classnames';
import SearchRounded from '@material-ui/icons/SearchRounded';
import { Input, InputProps } from 'reactstrap';

export interface ISearchBarProps extends InputProps {
  onSearchChanged: (search: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface ISearchBarState {
  search: string;
}

export class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  state: ISearchBarState = {
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
    const { className, placeholder, disabled, ...other } = this.props;
    return (
      <div className={cx('search-bar', className)}>
        <Input
          {...other}
          placeholder={placeholder}
          value={this.state.search}
          onChange={this.onSearchChange}
          disabled={disabled}
          type="text"
        />
        <SearchRounded className="search-bar-icon" />
      </div>
    );
  }
}
