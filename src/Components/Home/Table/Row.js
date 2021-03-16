import React, {useState, useContext, useEffect} from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
import {TextField} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dropdown from '../AddExpense/Dropdown-Menu/Dropdown'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import '../Home.scss'



function Row(props) {
  const userExpense = useContext(ExpenseContext)

  const [edit, setEdit] = useState(false)

  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(0)


  useEffect(() => {
    setDate(props.date)
    setTitle(props.title)
    setType(props.type)
    setAmount(props.amount)
  }, [props])


  const stopEditing = (e) => {
    setEdit(false)
    userExpense.editExpense(date, title, type, amount, props.id)
  }


  return (
    <TableRow key={props.id}>
      <TableCell align='center'><TextField disabled={!edit} type='date' value={date} onChange={(e) => setDate(e.target.value)} /></TableCell>
      <TableCell align='center'>{!edit ? title : <TextField type='text' value={title} onChange={(e) => setTitle(e.target.value)} />}</TableCell>
      <TableCell className='computer' align='center'>{!edit ? type : <Dropdown type='text' value={props.selectedOption} getValue={setType} onChange={(e) => setType(e.target.value)} />}</TableCell>
      <TableCell align='center'>{!edit ? amount : <TextField type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />}</TableCell>
      <TableCell>
        {edit ? (
          <DoneOutlineIcon onClick={() => stopEditing()}/>
          ) : (
            <EditIcon align='center' onClick={() => setEdit(true)} />
            )}
            <DeleteForeverIcon align='center' onClick={() => userExpense.deleteExpense(props.id)}/>
  </TableCell>
</TableRow>
            
  )
}

export default Row
            