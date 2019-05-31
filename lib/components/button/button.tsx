import './button.scss';
import React from 'react';
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
    return (
      <RButton {...this.props} className={'btn-spoon-ui'}>
        {!!this.props.iconLeft ? <div className="btn-icon icon-left">{this.props.iconLeft}</div> : null}
        <span className="button-text">
          {!!this.props.name && <Translate contentKey={this.props.name} />}
          {!this.props.text ? this.props.text : ''}
          {this.props.children}
        </span>
        {!!this.props.iconRight ? <div className="btn-icon icon-right">{this.props.iconRight}</div> : null}
      </RButton>
    );
  }
}

export default Button;
