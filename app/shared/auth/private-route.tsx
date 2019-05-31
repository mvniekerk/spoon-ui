import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IOwnProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

export interface IPrivateRouteProps extends IOwnProps, StateProps {}

export const PrivateRouteComponent = ({ component: Component, hasAnyAuthorities = [], ...rest }: IPrivateRouteProps) => {
  const renderRedirect = props => (
    <Redirect
      to={{
        pathname: '/login',
        search: props.location.search,
        state: { from: props.location }
      }}
    />
  );

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

  return <Route {...rest} render={renderRedirect} />;
};

const mapStateToProps = () => ({});

type StateProps = ReturnType<typeof mapStateToProps>;

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export const PrivateRoute = connect<StateProps, undefined, IOwnProps>(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(PrivateRouteComponent);

export default PrivateRoute;
