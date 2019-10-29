import React, { ReactNode, ComponentType, HTMLAttributes, FC } from 'react';

export interface IAlignmentProps extends React.Props<{}>, HTMLAttributes<{}> {
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'top' | 'bottom' | 'center' | 'stretch' | 'baseline';
}

/**
 * Wrap a given component so that it can receive align and justify properties
 * and transform them into bootstrap 4 utility classes
 * @see: https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
 */
export function Align<T>(Comp: ComponentType<T>) {
  return (props: IAlignmentProps & T) => {
    const { align, justify, ...rest } = props;

    let className = props.className || '';
    if (align || justify) {
      className += ' d-flex ';
    }

    switch (justify) {
      case 'start':
        className += 'justify-content-start';
        break;
      case 'end':
        className += 'justify-content-end ';
        break;
      case 'center':
        className += 'justify-content-center ';
        break;
      case 'between':
        className += 'justify-content-between ';
        break;
      case 'around':
        className += 'justify-content-around ';
        break;
      default:
        break;
    }

    switch (align) {
      case 'top':
        className += 'align-items-start ';
        break;
      case 'bottom':
        className += 'align-items-end ';
        break;
      case 'center':
        className += 'align-items-center ';
        break;
      case 'stretch':
        className += 'align-items-stretch ';
        break;
      case 'baseline':
        className += 'align-items-baseline ';
        break;
      default:
        break;
    }

    return (
      <Comp {...rest as T} className={className}>
        {props.children}
      </Comp>
    );
  };
}
