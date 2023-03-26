import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import order from "./order"

export default combineReducers({
  order,
  alerts,
  auth,
  navigation,
  register,
});
