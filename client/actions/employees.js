export const TYPES_ACTION_EMPLOYEES = {
  LOAD_EMPLOYEES: 'LOAD_EMPLOYEES',
  LOAD_EMPLOYEES_SUCCESS: 'LOAD_EMPLOYEES_SUCCESS',
  ADD_EMPLOYEES: 'ADD_EMPLOYEES',
  ADD_EMPLOYEES_SUCCESS: 'ADD_EMPLOYEES_SUCCESS',
  UPDATE_EMPLOYEES: 'UPDATE_EMPLOYEES',
  UPDATE_EMPLOYEES_SUCCESS: 'UPDATE_EMPLOYEES_SUCCESS',
  DELETE_EMPLOYEES: 'DELETE_EMPLOYEES',
  DELETE_EMPLOYEES_SUCCESS: 'DELETE_EMPLOYEES_SUCCESS',
};

const { LOAD_EMPLOYEES, ADD_EMPLOYEES, UPDATE_EMPLOYEES, DELETE_EMPLOYEES } = TYPES_ACTION_EMPLOYEES;

export const loadEmployees = () => {
  return {
    type: LOAD_EMPLOYEES
  }
}

export const addEmployee = (payload) => {
  return {
    type: ADD_EMPLOYEES,
    payload
  }
}
export const updateEmployee = (payload) => {
  return {
    type: UPDATE_EMPLOYEES,
    payload
  }
}
export const deleteEmployee = (payload) => {
  return {
    type: DELETE_EMPLOYEES,
    payload
  }
}


