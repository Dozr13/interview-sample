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
import TablePagination from '@material-ui/core/TablePagination';

import format from 'date-fns/format'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function TableView() {
  const userExpense = useContext(ExpenseContext)
  const [tableMap, setTableMap] = useState([])
  const [tableReduce, setTableReduce] = useState([])
  
  userExpense.expenses = Array.from(userExpense.expenses)
  
  // const columns = [
    //   {
      //     id: 'Due Date',
      //     label: 'Due Date',
      //     minWidth: 120
      //   },
      //   {
        //     id: ,
        //     label: '',
        //     minWidth: 120
        //   },
        //   {
          //     id: ,
          //     label: '',
          //     minWidth: 120
          //   },
          //   {
            //     id: ,
            //     label: '',
            //     minWidth: 120
            //   },
            //   {
              //     id: ,
              //     label: '',
              //     minWidth: 120
  //   }
  // ]
  
  
  useEffect(() => {
    setTableMap (userExpense.expenses.map((e, i) => {
      return <TableRow key={i}>
      <TableCell align='center'>{e.due_date}</TableCell>
      <TableCell align='center'>{e.expense_title}</TableCell>
      <TableCell align='center'>{e.bill_type}</TableCell>
      <TableCell align='center'>{e.amount}</TableCell>

      <TableCell align='center' onClick={() => userExpense.deleteExpense(e.id, e.due_date)}><DeleteForeverIcon /></TableCell>
    </TableRow>
  }))
  setTableReduce(userExpense.expenses.reduce((total, current) => {
    return total += parseInt(current.amount)
  }, 0))
}, [userExpense])


const useStyles = makeStyles({
  table: {
    maxWidth: 'xl'
  },
  container: {
    maxHeight: 400
  }
})


return (
  <TableContainer component={Paper}>
      <Table className={useStyles().table} aria-label='spanning table' align='center'>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={5}>Details</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' style={{fontSize: 18}}>Date Due</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Title</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Bill Type</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Amount</TableCell>
            <TableCell align='center' style={{fontSize: 18}}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableMap}
          <TableRow>
            <TableCell colSpan={3} align='right' style={{fontSize: 28}}>Total:</TableCell>
            <TableCell align='center' style={{fontSize: 28}}>{tableReduce}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView