import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    width: 650,
    height:'20px',
    border:'2px solid grey',
    marginTop:'10px',
    marginBottom:'10px'
    },
    tableBody:{
        height:'10px'
    }
});

const TableData = ({rows}) =>{
  
  const classes = useStyles();

    return (
        <div>
             <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>District</TableCell>
              <TableCell>Confirmed Cases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {rows.map(row => (
              <TableRow key={row.district}>
                <TableCell component="th" scope="row">
                  {row.district}
                </TableCell>
                <TableCell align="right">{row.confirmedCases}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
        </div>
    )
}
export default TableData;