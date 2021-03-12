import React, {useContext, useEffect, useState} from 'react';

import {ExpenseContext} from '../../../Context/ExpenseContext'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import {format} from 'date-fns/format'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
});

function TableView(props) {
  const userExpense = useContext(ExpenseContext)
  const [tableMap, setTableMap] = useState([])
  const [tableReduce, setTableReduce] = useState([])
  
  userExpense.expenses = Array.from(userExpense.expenses)

  useEffect((props) => {
    setTableMap (userExpense.expenses.map((e, i, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
// console.log(e)
      const currEdit = editIdx === i
      return <TableRow key={i}>
      {currEdit ? (
        <TextField name={e.props} onChange={(event) => handleChange(event, e.props, i)} value={e.props}/>
      ) : (
        e.props
      )}
      <TableCell align='center'>{e.due_date}</TableCell>
      {console.log(e.due_date)}
      <TableCell align='center'>{e.expense_title}</TableCell>
      <TableCell align='center'>{e.bill_type}</TableCell>
      <TableCell align='center'>${e.amount}</TableCell>
      <TableCell>
        {currEdit ? (
          <DoneOutlineIcon onClick={() => stopEditing()}/>
          ) : (
            <EditIcon align='center' onClick=
            // {() => userExpense.editExpense(e.due_date, e.expense_title, e.bill_type, e.amount, e.id)}
            {() => startEditing(i)}
            />
            )}
            <DeleteForeverIcon align='center' onClick=
            {() => userExpense.deleteExpense(e.id)}
            // {() => handleRemove(i)}
            />
      </TableCell>
    </TableRow>
  }))
  setTableReduce(userExpense.expenses.reduce((total, current) => {
    return total += parseInt(current.amount)
  }, 0))
}, [userExpense])


const classes = useStyles()


const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(8);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};


return (
  <Paper className={classes.root}>
    <TableContainer className={classes.container}>
      <Table stickyHeader className={useStyles().table} aria-label='sticky table' align='center'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{fontSize: 18}}>Date Due</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Title</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Bill Type</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Amount</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableMap.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          <TableRow>
            <TableCell colSpan={3} align='right' style={{fontSize: 28}}>Total:</TableCell>
            <TableCell align='center' style={{fontSize: 28}}>{tableReduce}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 5, 8]}
        component="div"
        count={userExpense.expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  </Paper>
  )
}

export default TableView