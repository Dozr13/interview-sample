import {createContext, useState} from 'react'
import axios from 'axios'


export const ExpenseContext = createContext(null)

export const ExpenseProvider = (props) => {
  const [expenses, setExpense] = useState([])


  const createExpense = (dueDate, expenseTitle, amount, billType) => {
    axios.post('/api/new-expense', {dueDate, expenseTitle, amount, billType}).then(({data}) => {
// console.log('outer created', dueDate)

      axios.post(`/api/read-day`, dueDate).then((res) => {
// console.log('inner created', dueDate)
        setExpense(res.data)
      }).catch(err => console.log('createExpenseTest inner .catch', err, data))
      
      setExpense(data)
    }).catch(err => console.log(dueDate))
  }


  const readDay = (dueDate) => {
// console.log(`duedate/${dueDate}`)
    axios.post('/api/read-day', {dueDate}).then((res) => {
// console.log('readDay', res)
      setExpense(res.data)
    }).catch(err => console.log(err))
  }


  const deleteExpense = (id, dueDate) => {
// console.log('deleted', dueDate)
    axios.delete(`/api/expense/${id}/${dueDate}`).then((res) => {
      setExpense(res.data)
    }).catch(err => console.log(err))
  }

  const readRangeExpenses = (selection) => {
// console.log(selection)
    axios.post('/api/expenses-range', {...selection}).then((res) => {
// console.log('range', res)
      setExpense(res.data)
    }).catch(err => console.log(err))
  }

  return (
    <ExpenseContext.Provider value={{expenses, setExpense, createExpense, readDay, deleteExpense, readRangeExpenses}}>
      {props.children}
    </ExpenseContext.Provider>
  )
}

