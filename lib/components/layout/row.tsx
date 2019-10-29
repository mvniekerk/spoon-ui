import React from 'react';
import { Row as RRow, RowProps } from 'reactstrap';
import { Align } from './align';

export const Row = Align<RowProps>(RRow);
