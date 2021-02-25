import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ExpenseContext} from '../../../../Context/ExpenseContext'

function TableView() {
  const useStyles = makeStyles({table: {maxWidth: 700}})

  const userExpense = useContext(ExpenseContext)


// console.log(userExpense.expenses)

  return (
    <TableContainer component={Paper}>
      <Table className={useStyles().table} aria-label='spanning table' align='center'>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={4}>Details</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center'>Date Due</TableCell>
            <TableCell align='center'>Title</TableCell>
            <TableCell align='center'>Bill Type</TableCell>
            <TableCell align='center'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userExpense.expenses.map((e, i) => {
            return <TableRow key={i}>
              <TableCell align='center'>{e.due_date}</TableCell>
              <TableCell align='center'>{e.expense_title}</TableCell>
              <TableCell align='center'>{e.bill_type}</TableCell>
              <TableCell align='center'>{e.amount}</TableCell>
            </TableRow>
          })}
          <TableRow>
            <TableCell colSpan={3} align='right'>Total</TableCell>
            <TableCell align='center'>{userExpense.expenses.reduce((total, current) => total += +current.amount, 0)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView
