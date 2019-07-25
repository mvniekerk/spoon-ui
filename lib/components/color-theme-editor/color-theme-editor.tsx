import React from 'react';
import { Col, Row } from 'reactstrap';
import ColorVariableSetter, { getRootColorVariable } from '../color-variable-setter/color-variable-setter';
import { translateItem } from '../dropdown/dropdown-item';

export interface IColorGroup {
  groupName: string;
  names: string[];
}

export interface IColorThemeEditorProps {
  groups: IColorGroup[];
}

export const colorsBackground: IColorGroup = {
  groupName: 'Background',
  names: ['body-background']
};

export const colorsPrimary: IColorGroup = {
  groupName: 'Primary',
  names: ['primary', 'primary-lighter', 'primary-active', 'primary-active-lighter', 'primary-active-darker']
};

export const colorsSecondary: IColorGroup = {
  groupName: 'Secondary',
  names: ['secondary']
};

export const colorsTertiary: IColorGroup = {
  groupName: 'Tertiary',
  names: ['tertiary', 'tertiary-darker', 'tertiary-active', 'tertiary-active-darker']
};

export const colorsMenu: IColorGroup = {
  groupName: 'Menu',
  names: [
    'menu-list-item-selected-color',
    'menu-close-color',
    'menu-background-color',
    'menu-item-color',
    'menu-item-icon-color',
    'menu-border',
    'menu-border-opaque',
    'menu-border-opaque-25',
    'menu-border-opaque-8'
  ]
};

export const colorsMisc: IColorGroup = {
  groupName: 'Misc',
  names: ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'white', 'pagination-border-color']
};

export const colorsWhiteGrayDark: IColorGroup = {
  groupName: 'Whites, Grays and Darks',
  names: ['gray', 'gray-dark', 'light', 'dark', 'dark-lighter', 'black-text', 'white-text', 'gray-darker', 'gray-lighter', 'dark-darker']
};

export const colorsHeader: IColorGroup = {
  groupName: 'Header',
  names: ['header', 'header-hover', 'header-secondary']
};

export const colorsAlerts: IColorGroup = {
  groupName: 'Alerts',
  names: ['success', 'info', 'warning', 'danger', 'error']
};

export const colorsSelection: IColorGroup = {
  groupName: 'Selection',
  names: ['selection-color-background', 'selection-color-checked', 'selection-color-checked-darker']
};

export const colorsProgression: IColorGroup = {
  groupName: 'Progression',
  names: ['progression-color', 'progression-border-color', 'progression-current', 'progression-shadow']
};

export const colorsTags: IColorGroup = {
  groupName: 'Tags',
  names: ['tags-color-1', 'tags-color-2', 'tags-color-3', 'tags-color-4']
};

export const colorsAllGroups = [
  colorsBackground,
  colorsPrimary,
  colorsSecondary,
  colorsTertiary,
  colorsSelection,
  colorsMenu,
  colorsHeader,
  colorsAlerts,
  colorsProgression,
  colorsTags,
  colorsMisc,
  colorsWhiteGrayDark
];

export function downloadThemeScssFile(): void {
  const text =
    [].concat
      .apply([], colorsAllGroups.map(b => b.names))
      .map(n => `$${n}: ${getRootColorVariable(n)} !default;`)
      .join('\n') + "\n\n@import 'node_modules/@grindrodbank/spoon-ui/spoon-ui';\n";
  const blob: Blob = new Blob([text], { type: 'text/scss' });
  const fileName = 'theme.scss';
  const objectUrl: string = URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

  a.href = objectUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

class ColorThemeEditor extends React.Component<IColorThemeEditorProps, {}> {
  static defaultProps: IColorThemeEditorProps = { groups: colorsAllGroups };

  render() {
    const headerText = name => name && translateItem({ name, display: name, value: 0 });
    return (
      <>
        {!!this.props.groups &&
          this.props.groups.map(group => (
            <>
              <h2>{headerText(group.groupName)}</h2>
              <Row>
                {group.names.map(b => (
                  <Col key={b} md={2}>
                    <ColorVariableSetter variable={b} />
                  </Col>
                ))}
              </Row>
            </>
          ))}
        {}
      </>
    );
  }
}

export default ColorThemeEditor;
