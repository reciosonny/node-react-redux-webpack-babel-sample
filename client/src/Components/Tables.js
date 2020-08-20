import React, { Component, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const Tables = ({ data, onRowClicked }) => {
  const [fieldState, setFieldState] = useState({
    columnDefs: [
      {
        headerName: "ID",
        field: "_id",
        sortable: true,
        hide: true
      },
      {
        headerName: "First Name",
        field: "firstName",
        sortable: true
      },
      {
        headerName: "Middle Name",
        field: "middleName",
        sortable: true,
      },
      {
        headerName: "Last Name",
        field: "lastName",
        sortable: true,
      },
      {
        headerName: "Position",
        field: "position",
        sortable: true,
      },
      {
        headerName: "Salary",
        field: "salary",
        sortable: true,
      },
    ],
    rowData: [],
  });

  useEffect(() => {
    
    if (data) {
     setFieldState({ ...fieldState, rowData: data });
    }

    return () => {
      
    }
  }, [data]);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "450px",
        width: "1000px"
      }}
    >
      <AgGridReact
        onRowClicked={(e) => onRowClicked(e.data)}
        columnDefs={fieldState.columnDefs}
        rowData={fieldState.rowData}
      ></AgGridReact>
    </div>
  );
};

export default Tables;
