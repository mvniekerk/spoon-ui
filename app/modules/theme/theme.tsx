import React from 'react';
import { Components } from 'lib';
import { Card, Row } from 'reactstrap';
/* tslint:disable:no-submodule-imports */
import { ColorThemeEditor } from 'lib/components';
/* tslint:enable:no-submodule-imports */

export class Theme extends React.Component {
  render() {
    return (
      <Card>
        <ColorThemeEditor />
      </Card>
    );
  }
}
