import './search-bar.scss';
import React, { ChangeEvent, MouseEvent } from 'react';
import cx from 'classnames';
import SearchRounded from '@material-ui/icons/SearchRounded';
import { Input, InputProps } from 'reactstrap';

export interface ISearchBarProps extends InputProps {
  onSearchChanged: (search: string) => void;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  global?: boolean;
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
    this.state.search = this.props.value || '';
  }

  componentWillReceiveProps(nextProps: ISearchBarProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ search: nextProps.value });
    }
  }

  onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    this.setState({ search });
    this.props.onSearchChanged(search);
  }

  onSearchClick(e: MouseEvent<HTMLInputElement>) {
    e.stopPropagation();
  }

  render() {
    const { className, placeholder, disabled, global, ...other } = this.props;
    return (
      <div className={cx(`search-bar ${global ? ' global-search' : ''}`, className)}>
        <Input
          {...other}
          placeholder={placeholder}
          value={this.state.search}
          onChange={this.onSearchChange}
          disabled={disabled}
          className={`${this.state.search ? '' : ' empty'}`}
          onClick={this.onSearchClick}
          type="text"
        />
        <SearchRounded className="search-bar-icon" />
      </div>
    );
  }
}
