import React from 'react';
import { Container as RContainer, ContainerProps } from 'reactstrap';
import { Align } from './align';

export const Container = Align<ContainerProps>(RContainer);
