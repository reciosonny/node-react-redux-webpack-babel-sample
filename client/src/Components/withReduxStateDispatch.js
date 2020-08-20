import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadEmployees, addEmployee, updateEmployee, deleteEmployee } from '../../actions/employees';


function enhancedComponent(WrappedComponent) {
  function withReduxStateDispatch(props) {
    return <WrappedComponent {...props} />;
  }

  function mapStateToProps({ employees }) {
    return {
      employees,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      loadEmployees: () => dispatch(loadEmployees()),
      addEmployee: (payload) => dispatch(addEmployee(payload)),
      updateEmployee: (payload) => dispatch(updateEmployee(payload)),
      deleteEmployee: (payload) => dispatch(deleteEmployee(payload)),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(withReduxStateDispatch);
}


export default enhancedComponent;