import React, { useState, Component, useEffect } from "react";
import { MdPersonAdd } from 'react-icons/md';
import { FaSave, FaUserMinus } from 'react-icons/fa';
import { hot } from "react-hot-loader";
import Box from "@material-ui/core/Box";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";

import Table from "./Tables";
import Modal from "./Modal";
import withReduxStateDispatch from "./withReduxStateDispatch";


const App = ({
  loadEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employees,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldState, setFieldState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
    salary: 10000
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);


  useEffect(() => {
    loadEmployees();

    axios.get("/api/employees").then((res) => console.log(res.data));

    return () => {};
  }, []);

  const onSaveEmployee = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    const filledAllFields = !Object.keys(fieldState).some(
      (x) => fieldState[x] === ""
    );
  
    setShowErrorSummary(!filledAllFields);

    if (filledAllFields) {

      if (isAddMode) {
        addEmployee(fieldState);
      } else {
        updateEmployee(fieldState);
      }
      
      setModalOpen(false);
      loadEmployees();
    }
  }

  const onRowClicked = (rowData) => {
    setModalOpen(true);
    setFieldState(rowData);
    setIsAddMode(false);
  }

  const onShowAddNewEmployee = () => {
    setFieldState({
      firstName: "",
      middleName: "",
      lastName: "",
      position: "",
      salary: 10000
    });
    setFormSubmitted(false);
    setIsAddMode(true);
    setModalOpen(true);
  }

  const onDeleteEmployee = () => {
    setModalOpen(false);
    setShowModalDelete(false);
    setFormSubmitted(false);

    deleteEmployee(fieldState);

    setTimeout(() => {
      loadEmployees()
    }, 500);
  }

  const onCancelDelete = () => {
    setShowModalDelete(false);    
  }
  

  return (
    <Box>
      <Container style={{ width: "720px !important", marginTop: "100px" }}>
        <h1>ABC Company Employee Database</h1>
        <Button
          color="primary"
          variant="contained"
          style={{ marginBottom: "10px" }}
          onClick={onShowAddNewEmployee}
        >
          <MdPersonAdd fontSize="24px" />
        </Button>

        <div>
          <Table data={employees.data} onRowClicked={onRowClicked} />
        </div>

        <div>
          <Modal open={modalOpen} onLeave={() => setModalOpen(false)}>

            <h1>{isAddMode ? "Add new employee" : "Update employee records"}</h1>
            <form onSubmit={onSaveEmployee}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <h2>Basic Info</h2>
                  <TextField
                    id="standard-basic"
                    label="First name"
                    error={!fieldState["firstName"] && formSubmitted}
                    helperText={!fieldState["firstName"] && formSubmitted && "First name is required"}
                    value={fieldState["firstName"]}
                    onChange={e => setFieldState({ ...fieldState, firstName: e.target.value })}
                  />{" "}
                  {"  "}
                  <TextField
                    id="standard-basic"
                    label="Middle name"
                    value={fieldState["middleName"]}
                    error={!fieldState["middleName"] && formSubmitted}
                    onChange={e => setFieldState({ ...fieldState, middleName: e.target.value })}
                    helperText={!fieldState["middleName"] && formSubmitted && "Middle name is required"}
                  />{" "}
                  {"  "}
                  <TextField
                    id="standard-basic"
                    label="Last name"
                    value={fieldState["lastName"]}
                    error={!fieldState["lastName"] && formSubmitted}
                    onChange={e => setFieldState({ ...fieldState, lastName: e.target.value })}
                    helperText={!fieldState["lastName"] && formSubmitted && "Last name is required"}
                  />
                </Grid>

                <Grid item md={12}>
                  <h2>Employment Status</h2>
                  <TextField 
                    id="standard-basic" 
                    label="Job Position" 
                    value={fieldState["position"]}
                    error={!fieldState["position"] && formSubmitted}
                    onChange={e => setFieldState({ ...fieldState, position: e.target.value })}
                    helperText={!fieldState["position"] && formSubmitted && "Position is required"}
                  />
                  
                  {"  "}
                  <FormControl style={{ width: "160px" }}>
                    <InputLabel>Minimum Salary</InputLabel>
                    <Select
                      value={fieldState["salary"] ?? 10000}
                      onChange={(e) =>
                        setFieldState({ ...fieldState, salary: e.target.value })
                      }
                    >
                      <MenuItem value={10000}>10,000</MenuItem>
                      <MenuItem value={20000}>20,000</MenuItem>
                      <MenuItem value={30000}>30,000</MenuItem>
                      <MenuItem value={40000}>40,000</MenuItem>
                      <MenuItem value={50000}>50,000</MenuItem>
                      <MenuItem value={60000}>60,000</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  {showErrorSummary && (<div style={{ marginBottom: "10px", color: "#f44336" }}>
                    <span>Please complete the details above</span>
                  </div>)}

                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setModalOpen(true)}
                    type="submit"
                  >
                    <FaSave fontSize="24px" />
                  </Button>
                  {" "}
                  {!isAddMode && (
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => setShowModalDelete(true)}
                    >
                      <FaUserMinus fontSize="24px" />
                    </Button>
                  )}

                </Grid>
              </Grid>
            </form>
            
            <Modal open={showModalDelete} onLeave={() => setShowModalDelete(false)}>
              <h2>Delete employee</h2>
              <span>Are you sure you want to delete this employee?</span>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button color="primary" onClick={onCancelDelete}>Cancel</Button> {" "}
                <Button color="primary" onClick={onDeleteEmployee}>Yes</Button>
              </div>
            </Modal>
          </Modal>
        </div>
      </Container>
    </Box>
  );
};

export default withReduxStateDispatch(hot(module)(App));
