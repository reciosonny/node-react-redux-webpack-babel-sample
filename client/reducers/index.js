import { combineReducers } from 'redux';
import employees from './employees';



export default function createRootReducer() {
  return combineReducers({
    employees,
  });
}

