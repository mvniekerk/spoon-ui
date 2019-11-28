import './add-to-from-list.scss';
import React, { HTMLAttributes } from 'react';
import Add from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import { SearchBar } from '../search-bar/search-bar';
import { Col } from 'reactstrap';
import { ScrollableArea } from '../scrollable-area/scrollable-area';
import { ITranslatedSelectableValue, translateItem } from '../../util/translation';

export interface IAddToFromListProps extends HTMLAttributes<HTMLDivElement> {
  helpText?: string;
  sourceListHeader: string;
  destinationListHeader: string;
  onSearchChanged?: (string) => void;
  listHeight?: string;
  sourceList: Array<ITranslatedSelectableValue<string>>;
  selectedListChanged?: (selected: Array<ITranslatedSelectableValue<string>>) => void;
  selected?: Array<ITranslatedSelectableValue<string>>;
}

export interface IAddToFromListState {
  selected: Array<ITranslatedSelectableValue<string>>;
}

export class AddToFromList extends React.Component<IAddToFromListProps, IAddToFromListState> {
  constructor(props: any) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.state = {
      selected: !!this.props.selected ? this.props.selected : []
    };
    this.addSelected = this.addSelected.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }

  onSearchChanged(e: string) {
    if (!!this.props.onSearchChanged) {
      this.props.onSearchChanged(e);
    }
  }

  addSelected(val) {
    const selected = [...this.state.selected.filter(b => b.value !== val.value), val];
    this.setState({ selected });
    if (!!this.props.selectedListChanged) {
      this.props.selectedListChanged(selected);
    }
  }

  removeSelected(val) {
    const selected = this.state.selected.filter(b => b.value !== val.value);
    this.setState({ selected });
  }

  render() {
    const height = !!this.props.listHeight ? this.props.listHeight : '300px';
    const {
      helpText,
      sourceListHeader,
      destinationListHeader,
      onSearchChanged,
      listHeight,
      sourceList,
      selectedListChanged,
      selected,
      ...htmlAttrs
    } = this.props;

    return (
      <div className="add-to-from-list" {...htmlAttrs}>
        {!!this.props.helpText && <span className="help-text">{this.props.helpText}</span>}
        <div className="middle-box">
          <div className="source-box">
            <div className="box-header">{this.props.sourceListHeader}</div>
            <Col className="search-bar-holder">
              <SearchBar onSearchChanged={this.onSearchChanged} />
            </Col>
            <div className="items-container" style={{ height }}>
              <ScrollableArea>
                {!!this.props.sourceList &&
                  this.props.sourceList.filter(b => !this.state.selected.some(bb => bb.value === b.value)).map(b => (
                    <button className="list-item" key={b.name} onClick={this.addSelected.bind(this, b)}>
                      <span className="list-item-text">{translateItem(b)}</span>
                      <Add className="list-item-icon" />
                    </button>
                  ))}
              </ScrollableArea>
            </div>
          </div>
          <div className="left-right-icon">
            <ArrowBack />
            <ArrowForward />
          </div>
          <div className="destination-box">
            <div className="box-header">{this.props.destinationListHeader}</div>
            <div className="items-container" style={{ height }}>
              {!!this.state.selected &&
                this.state.selected.map(b => (
                  <button className="list-item" key={b.value} onClick={this.removeSelected.bind(this, b)}>
                    <span className="list-item-text">{translateItem(b)}</span>
                    <DeleteRounded />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
