import { TYPES_ACTION_EMPLOYEES } from '../actions/employees';



const initState = {
  isLoading: true,
  data: [],
}

export default function employees(state = initState, action) {

  const { ADD_EMPLOYEES, DELETE_EMPLOYEES, LOAD_EMPLOYEES, LOAD_EMPLOYEES_SUCCESS, UPDATE_EMPLOYEES } = TYPES_ACTION_EMPLOYEES;

  switch (action.type) {
    case LOAD_EMPLOYEES_SUCCESS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}


