import './items-per-page.scss';

import React from 'react';
import { Dropdown } from '../dropdown';
import { ITranslatedSelectableValue } from '../../util/translation';

export interface IItemsPerPageProps {
  amounts: number[];
  onChange: (itemsPerPage: number) => void;
  text: string;
  defaultPerPage: number;
}

export interface IItemsPerPageState {
  itemsPerPage: number;
  selectedDefault: boolean;
}

export class ItemsPerPage extends React.Component<IItemsPerPageProps, IItemsPerPageState> {
  static defaultProps: IItemsPerPageProps = {
    amounts: [10, 20, 50, 100],
    onChange: i => {},
    text: 'Results per page',
    defaultPerPage: 20
  };

  state: IItemsPerPageState = {
    itemsPerPage: 20,
    selectedDefault: false
  };

  private _dropdown: Dropdown<number>;

  constructor(props) {
    super(props);
  }

  componentDidUpdate(oldProps: IItemsPerPageProps, oldState: IItemsPerPageState) {
    if (!!this._dropdown && !this.state.selectedDefault) {
      this.setState(_ => ({ selectedDefault: true }));
    }
    if (this.state.selectedDefault && !oldState.selectedDefault) {
      this._dropdown.setState(p => ({
        selection: p.values.filter(a => a.value === this.state.itemsPerPage)
      }));
    }
  }

  render() {
    const onValueSelected = (e: ITranslatedSelectableValue<number>) => this.props.onChange(e.value);
    const vals: Array<ITranslatedSelectableValue<number>> = this.props.amounts.map(a => ({
      display: `${a}`,
      value: a
    }));
    return (
      <div className="item-per-page">
        <div className="item-per-page-text">{this.props.text}</div>
        <div style={{ flex: 0, flexGrow: 0 }}>
          <Dropdown<number> ref={ref => (this._dropdown = ref)} onValueSelected={onValueSelected} initialValues={vals} disableDeselect />
        </div>
      </div>
    );
  }
}
