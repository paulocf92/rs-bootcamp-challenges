import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import StudentList from '~/pages/StudentList';
import StudentForm from '~/pages/StudentForm';
import RegistrationList from '~/pages/RegistrationList';
import RegistrationForm from '~/pages/RegistrationForm';
import PlanList from '~/pages/PlanList';
import PlanForm from '~/pages/PlanForm';
import HelpOrderList from '~/pages/HelpOrderList';

export default function() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/register" component={StudentForm} isPrivate />
      <Route
        path="/students/edit/:id"
        component={StudentForm}
        updating
        isPrivate
      />
      <Route
        path="/registrations"
        exact
        component={RegistrationList}
        isPrivate
      />
      <Route
        path="/registrations/register"
        component={RegistrationForm}
        isPrivate
      />
      <Route
        path="/registrations/edit/:id"
        component={RegistrationForm}
        updating
        isPrivate
      />
      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/plans/register" component={PlanForm} isPrivate />
      <Route path="/plans/edit/:id" component={PlanForm} updating isPrivate />
      <Route path="/help-orders" component={HelpOrderList} isPrivate />
      <Redirect to="/" />; {/* Not found */}
    </Switch>
  );
}
