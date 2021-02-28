import React, {useContext, useEffect, useState} from 'react';

import {ExpenseContext} from '../../../../Context/ExpenseContext'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function TableView(props) {
  const useStyles = makeStyles({table: {maxWidth: 700}})

  const userExpense = useContext(ExpenseContext)


  const [tableMap, setTableMap] = useState([])
  const [tableReduce, setTableReduce] = useState([])
  
  userExpense.expenses = Array.from(userExpense.expenses)
  
  useEffect(() => {
    console.log('1st useEffect on Table', typeof userExpense.expenses)
  setTableMap (userExpense.expenses.map((e, i) => {
    return <TableRow key={i}>
      <TableCell align='center'>{e.due_date}</TableCell>
      <TableCell align='center'>{e.expense_title}</TableCell>
      <TableCell align='center'>{e.bill_type}</TableCell>
      <TableCell align='center'>{e.amount}</TableCell>
    </TableRow>
  }))
}, [userExpense])


  
  // useEffect(() => {
  //   console.log('reduce', userExpense.expenses)
  //   setTableReduce(userExpense.expenses.reduce((total, current) => {
  //     return total += current.amount
  //   }, 0))
  // }, [userExpense])

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
          {tableMap}
          <TableRow>
            <TableCell colSpan={3} align='right'>Total</TableCell>
            <TableCell align='center'>{tableReduce}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView
