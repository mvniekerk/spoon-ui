import React from 'react';
import { Col as RCol, ColProps } from 'reactstrap';
import { Align } from './align';

export const Col = Align<ColProps>(RCol);
