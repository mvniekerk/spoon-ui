import React, { ReactNode, HTMLAttributes } from 'react';
import { CenteredLayout } from 'lib/components';

interface ICenteredLayoutExampleProps extends HTMLAttributes<{}> {
  children: ReactNode;
}

export class CenteredLayoutExample extends React.Component<ICenteredLayoutExampleProps> {
  render() {
    return <CenteredLayout>This text should be vertically and horizontally centered</CenteredLayout>;
  }
}
