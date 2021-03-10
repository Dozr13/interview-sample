import {createContext, useState} from 'react'
import axios from 'axios'


export const ExpenseContext = createContext(null)

export const ExpenseProvider = (props) => {
  const [expenses, setExpense] = useState([])
  
  const readRangeExpenses = (selection) => {
    axios.post('/api/expenses-range', {...selection}).then((res) => {
      setExpense(res.data)
    }).catch(err => console.log(err))
  }

  const createExpense = (dueDate, expenseTitle, amount, billType, selection) => {
    axios.post('/api/new-expense', {dueDate, expenseTitle, amount, billType}).then(({data}) => {
      axios.post('/api/expenses-range', {...selection}).then((res) => {
        setExpense(res.data)
      }).catch(err => console.log('createExpenseTest inner .catch', err, data))
      
      setExpense(data)
    }).catch(err => console.log(dueDate))
  }
  
  const editExpense = (dueDate, expenseTitle, billType, amount, id) => {
// console.log({dueDate, expenseTitle, amount, billType, id})
axios.put(`/api/edit-expense/${id}`, {dueDate, expenseTitle, billType, amount}).then((res) => {
      readRangeExpenses()
    }).catch(err => console.log(err))
  }

//   const readDay = (dueDate) => {
// // console.log(`duedate/${dueDate}`)
//     axios.post('/api/read-day', {dueDate}).then((res) => {
// // console.log('readDay', res)
//       setExpense(res.data)
//     }).catch(err => console.log(err))
//   }


  const deleteExpense = (id, dueDate) => {
// console.log('deleted', dueDate)
    axios.delete(`/api/expense/${id}/${dueDate}`).then((res) => {
      setExpense(res.data)
    }).catch(err => console.log(err))
  }



  return (
    <ExpenseContext.Provider value={{expenses, setExpense, createExpense, editExpense, deleteExpense, readRangeExpenses}}>
      {props.children}
    </ExpenseContext.Provider>
  )
}

