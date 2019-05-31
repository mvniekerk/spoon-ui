import React from 'react';
import ColorPicker from '../color-picker/color-picker';
import Color from 'color';

export interface IColorVariableSetterProps {
  variable: string;
}

export interface IColorVariableSetterState {
  color: string;
}

export function getRootColorVariable(variable: string) {
  const color = getRootVariable(variable, '#ffffff');
  const c = new Option().style;
  c.color = color;
  const cc = Color(c.color);
  return cc.alpha() === 1 ? cc.hex() : color;
}

export function getRootVariable(variable: string, defaultVal = '') {
  const val = getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`);
  return !!val && !!val.trim() ? val.trim() : defaultVal;
}

class ColorVariableSetter extends React.Component<IColorVariableSetterProps, IColorVariableSetterState> {
  state: IColorVariableSetterState = {
    color: '#fff'
  };

  componentDidMount() {
    const color = getRootColorVariable(this.props.variable);
    this.setState({ color });
  }
  render() {
    const onSelected = color => {
      document.documentElement.style.setProperty(`--${this.props.variable}`, color);
      this.setState({ color });
    };
    return (
      <div>
        <ColorPicker headerText={`colors.${this.props.variable}`} onColorSelected={onSelected} color={this.state.color} />
      </div>
    );
  }
}

export default ColorVariableSetter;
