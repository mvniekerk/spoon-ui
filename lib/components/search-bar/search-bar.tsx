import './search-bar.scss';
import React, { ChangeEvent } from 'react';
import SearchRounded from '@material-ui/icons/SearchRounded';
import { FormGroup, Input } from 'reactstrap';

export interface ISearchBarProps {
  onSearchChanged: (search: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface ISearchBarState {
  search: string;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
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
    return (
      <FormGroup className="search-bar">
        <Input
          placeholder={this.props.placeholder}
          value={this.state.search}
          onChange={this.onSearchChange}
          disabled={this.props.disabled}
        />
        <SearchRounded className="search-bar-icon" />
      </FormGroup>
    );
  }
}

export default SearchBar;
