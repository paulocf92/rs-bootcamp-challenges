import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import StudentList from '~/pages/StudentList';
import RegistrationList from '~/pages/RegistrationList';
import PlanList from '~/pages/PlanList';
import HelpOrderList from '~/pages/HelpOrderList';

export default function() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/registrations" component={RegistrationList} isPrivate />
      <Route path="/plans" component={PlanList} isPrivate />
      <Route path="/help-orders" component={HelpOrderList} isPrivate />
    </Switch>
  );
}
