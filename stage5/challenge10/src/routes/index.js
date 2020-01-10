import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import StudentList from '~/pages/StudentList';
import StudentForm from '~/pages/StudentForm';
import RegistrationList from '~/pages/RegistrationList';
import PlanList from '~/pages/PlanList';
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
      <Route path="/registrations" component={RegistrationList} isPrivate />
      <Route path="/plans" component={PlanList} isPrivate />
      <Route path="/help-orders" component={HelpOrderList} isPrivate />
      <Redirect to="/" />; {/* Not found */}
    </Switch>
  );
}
