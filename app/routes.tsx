import React from 'react';
import { Switch } from 'react-router-dom';

/* tslint:disable:no-submodule-imports */
import Home from 'app/modules/home/home';
import { ErrorBoundaryRoute } from 'lib/components/index';
import Typography from 'app/modules/fonts/typography';
import Buttons from 'app/modules/buttons/buttons';
import Forms from 'app/modules/forms/forms';
import DropdownDemo from 'app/modules/dropdowns/dropdown';
import Selection from 'app/modules/selection/selection';
import Navigation from 'app/modules/navigation/navigation';
import Tables from 'app/modules/tables/tables';
import { Theme } from 'app/modules/theme/theme';
import { ArrowDropDown, CheckCircleOutline, Dashboard, FontDownload, TableChart, TextFields, TouchApp } from '@material-ui/icons';
import { CurrentRouteAndIcon } from 'lib/reducers/route-position';
/* tslint:enable:no-submodule-imports */

// tslint:enable
const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/typography" component={Typography} />
      <ErrorBoundaryRoute path="/buttons" component={Buttons} />
      <ErrorBoundaryRoute path="/forms" component={Forms} />
      <ErrorBoundaryRoute path="/dropdowns" component={DropdownDemo} />
      <ErrorBoundaryRoute path="/selection" component={Selection} />
      <ErrorBoundaryRoute path="/navigation" component={Navigation} />
      <ErrorBoundaryRoute path="/tables" component={Tables} />
      <ErrorBoundaryRoute path="/theme" component={Theme} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
