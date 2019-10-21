import React from 'react';
import { Components } from 'lib';
import { Card, Row } from 'reactstrap';
import { ColorThemeEditor } from 'lib/components';

export class Theme extends React.Component {
  render() {
    return (
      <Card>
        <ColorThemeEditor />
      </Card>
    );
  }
}
