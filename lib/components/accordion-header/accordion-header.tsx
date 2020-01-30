import './accordion-header.scss';
import { CardHeader } from 'reactstrap';
import React from 'react';

import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
import CheckRounded from '@material-ui/icons/CheckRounded';
import PriorityHighRounded from '@material-ui/icons/PriorityHighRounded';

export const AccordionHeader = (props: { text: string; valid: boolean; open: boolean; onClick: () => void }) => (
  <CardHeader
    onClick={props.onClick}
    className={'accordion-card-header' + (props.open ? ' open' : ' closed') + (props.valid ? ' valid' : '')}
  >
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <h2 style={{ flexGrow: 1, paddingTop: '4px' }}>{props.text}</h2>

      <span className={'status-icon' + (props.valid ? ' valid' : '')}>
        <div className="status-icon-padder">
          {props.valid && <CheckRounded />}
          {!props.valid && <PriorityHighRounded />}
        </div>
      </span>
      <span className="expander">
        {props.open && <ExpandLessRounded />}
        {!props.open && <ExpandMoreRounded />}
      </span>
    </div>
  </CardHeader>
);
