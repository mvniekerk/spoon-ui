import './color-picker.scss';
import React, { createRef } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, FormGroup, Label } from 'reactstrap';
import MbColorPicker from 'mb-react-color-picker';
import { translateItem } from '../dropdown/dropdown-item';

import triangle from '../../../static/images/triangle.svg';
import { getRootVariable } from '../color-variable-setter/color-variable-setter';
const triangleImage = `url("${triangle}")`;

export interface IColorPickerProps {
  headerText: string;
  onColorSelected: (val: string) => void;
  color: string;
}

export interface IColorPickerState {
  dropdownOpen: boolean;
  color: string;
  offset: number;
}

class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
  static defaultProps: IColorPickerProps = {
    headerText: '',
    onColorSelected: _ => {},
    color: '#ffff'
  };

  state: IColorPickerState = {
    dropdownOpen: false,
    color: '#fff',
    offset: 0
  };

  _colorButtonEl = createRef<HTMLDivElement>();
  _dropdownEl = createRef<DropdownMenu>();
  _arrowRef = createRef<HTMLDivElement>();
  _enclosingRef = createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.setState({ color: this.props.color });
    this.onResize = this.onResize.bind(this);
  }

  onResize() {
    document.documentElement.style.setProperty(`--color-picker-menu-left`, '0');
    this.setState({ dropdownOpen: false });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidUpdate(oldProps: IColorPickerProps, oldState: IColorPickerState) {
    const color = this.props.color;
    if (color !== this.state.color) {
      this.setState({ color });
    }

    if (!!this._colorButtonEl && !!this._dropdownEl && !!this._enclosingRef) {
      const rectBtn = this._colorButtonEl.current.getBoundingClientRect();
      const rectArrow = this._arrowRef.current.getBoundingClientRect();
      const els = this._enclosingRef.current.getElementsByClassName('dropdown-menu show');
      const menuLeft = getRootVariable('color-picker-menu-left');
      if (!!els && rectArrow.left > 0 && menuLeft === '0') {
        const diff = rectBtn.left + rectBtn.width / 2 - (rectArrow.left + rectArrow.width / 2);
        document.documentElement.style.setProperty(`--color-picker-menu-left`, `${diff}px`);
      }
    }
  }

  ArrowUpLeft = props => <div className="arrow-up-left" style={{ backgroundImage: triangleImage }} ref={this._arrowRef} />;

  render() {
    const a = () => this.setState(p => ({ dropdownOpen: !p.dropdownOpen }));
    const handleChange = color => {
      this.setState({ color });
      this.props.onColorSelected(color);
    };
    const headerText = !!this.props.headerText && translateItem({ name: this.props.headerText, display: this.props.headerText, value: 0 });
    return (
      <FormGroup className={`color-dropdown ${this.state.dropdownOpen && 'show'}`}>
        <div ref={this._enclosingRef}>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={a} direction="down" size="280px">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ref={this._colorButtonEl}>
              <DropdownToggle tag="div" className="color-display" style={{ backgroundColor: this.state.color }} />
              {!!headerText && <Label style={{ textAlign: 'center', verticalAlign: 'center', width: '100%' }}>{headerText}</Label>}
            </div>
            <DropdownMenu>
              <this.ArrowUpLeft />
              <div className="top-spacer" />
              <div className={`color-picker-container ${!this.props.headerText && 'no-header'}`}>
                <MbColorPicker headerText={headerText} {...this.state} onChange={handleChange} />
              </div>
              <div className="bottom-spacer" />
            </DropdownMenu>
          </Dropdown>
        </div>
      </FormGroup>
    );
  }
}

export default ColorPicker;
