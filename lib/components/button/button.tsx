import './button.scss';
import React from 'react';
import cx from 'classnames';
import { Button as RButton, ButtonProps } from 'reactstrap';
import { Translate } from 'react-jhipster';

export interface IButtonProps extends ButtonProps {
  color?: string;
  disabled?: boolean;
  iconRight?: JSX.Element;
  iconLeft?: JSX.Element;
  name?: string;
  text?: string;
}

export class Button extends React.Component<IButtonProps> {
  public static defaultProps: Readonly<IButtonProps> = {
    color: 'secondary',
    disabled: false,
    iconLeft: null,
    iconRight: null
  };

  render() {
    const { iconRight, iconLeft, name, text, className, children, ...other } = this.props;
    return (
      <RButton className={cx('btn-spoon-ui', className)} {...other}>
        {!!iconLeft ? <div className="btn-icon icon-left">{iconLeft}</div> : null}
        <span className="button-text">
          {!!name && <Translate contentKey={name} />}
          {!text ? text : ''}
          {children}
        </span>
        {!!iconRight ? <div className="btn-icon icon-right">{iconRight}</div> : null}
      </RButton>
    );
  }
}
