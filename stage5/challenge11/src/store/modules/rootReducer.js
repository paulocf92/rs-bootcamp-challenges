import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import checkIn from './checkIn/reducer';
import helpOrder from './helpOrder/reducer';

export default combineReducers({
  auth,
  user,
  checkIn,
  helpOrder,
});
