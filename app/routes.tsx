import React from 'react';
import { Switch } from 'react-router-dom';

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
import { CenteredLayoutExample } from 'app/modules/centered-layout/centered-layout';
import { ContainersExamples } from 'app/modules/containers/containers';
import { Entities } from 'app/modules/entities/entities';
import { ModalsPopovers } from 'app/modules/modals-popovers/modals-popovers';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Dashboard from '@material-ui/icons/Dashboard';
import FontDownload from '@material-ui/icons/FontDownload';
import TableChart from '@material-ui/icons/TableChart';
import TextFields from '@material-ui/icons/TextFields';
import TouchApp from '@material-ui/icons/TouchApp';
import { CurrentRouteAndIcon } from 'lib/reducers/route-position';

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
      <ErrorBoundaryRoute path="/centered-layout" component={CenteredLayoutExample} />
      <ErrorBoundaryRoute path="/containers" component={ContainersExamples} />
      <ErrorBoundaryRoute path="/entities" component={Entities} />
      <ErrorBoundaryRoute path="/modals-popovers" component={ModalsPopovers} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
