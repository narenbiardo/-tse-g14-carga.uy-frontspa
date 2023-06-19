import React from "react";
import { DataGrid } from "@mui/x-data-grid";


export const StripedDataGrid = (props) => {
  
    const getRowClassName = (params) => {
      return params.indexRelativeToCurrentPage % 2 === 0 ? 'striped-row-even' : 'striped-row-odd';
    };
  
    return (
      <DataGrid
        {...props}
        getRowClassName={getRowClassName}
      />
    );
  }