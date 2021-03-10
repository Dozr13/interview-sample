import React, {useContext, useState, useEffect}  from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
// import {AuthContext} from '../../../Context/AuthContext'
import Dropdown from './Dropdown-Menu/Dropdown'
// import Select from 'react-select'

import TableView from './Table/TableView'

// import format from 'date-fns/format'


function Expenses() {
  // const [dueDate, setDate] = useState('')
  // const [expenseTitle, setTitle] = useState('')
  // const [amount, setAmount] = useState('')
  // const [billType, setType] = useState('')
  // Bill Date selector to see specific dates
  // const [selectedDay, setSelectedDay] = useState('')

  const userExpense = useContext(ExpenseContext)

  const [editIdx, setEditIdx] = useState(-1)

  // const createExpense = (e) => {
  //   // const date = format(new Date(), 'yyyy-MM-dd')
  //   userExpense.createExpense(dueDate, expenseTitle, amount, billType)
  //   // console.log('date Expense.js--', dueDate, selectedDay)
  //   setDate('')
  //   setTitle('')
  //   setAmount('')
  //   setType('')
  // }

  const startEdit = (i) => {
    setEditIdx({editIdx: i})
  }

  const stopEditing = (e) => {
    console.log(e)
    userExpense.editExpense(e.due_date, e.expense_title, e.bill_type, e.amount, e.id)
    setEditIdx({editIdx: -1})
  }

  const handleChange = (e, name, i) => {
    const {value} = e.target
    setEditIdx(editIdx => ({
      data: editIdx.data.map((row, j) => j === i ? ({...row, [name]: value}) : row)
    }))
  }


  return (
    <div>
      <div>
        <TableView 
          startEdit={startEdit}
          editIdx={editIdx}
          stopEditing={stopEditing}
          handleChange={handleChange} 
        />
      </div>


    </div>
  )
}

export default Expenses
