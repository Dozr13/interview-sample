import {createContext, useState} from 'react'
import {addDays} from 'date-fns';
import axios from 'axios'


export const ExpenseContext = createContext(null)

export const ExpenseProvider = (props) => {
  const [expenses, setExpense] = useState([])

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 10),
      key: 'selection'
    }
  ]);
  
  const readRangeExpenses = (selection) => {
    setRange(selection)
    axios.post('/api/expenses-range', {...selection}).then((res) => {
      console.log(selection)
      setExpense(res.data)
    }).catch(err => console.log(err))
  }

  const createExpense = (dueDate, expenseTitle, amount, billType, selection) => {
    axios.post('/api/new-expense', {dueDate, expenseTitle, amount, billType}).then(({data}) => {
      console.log({dueDate})
      axios.post('/api/expenses-range', {...selection}).then(() => {
        console.log({dueDate})
        readRangeExpenses(selection)
      }).catch(err => console.log('createExpenseTest inner .catch', err, data))
      console.log({dueDate})
      readRangeExpenses(selection)
    }).catch(err => console.log(dueDate))
  }

  
  const editExpense = (dueDate, expenseTitle, billType, amount, id) => {
axios.put(`/api/edit-expense/${id}`, {dueDate, expenseTitle, billType, amount}).then(() => {
      readRangeExpenses(range)
    }).catch(err => console.log(err))
  }
  
  const deleteExpense = (id) => {
    axios.delete(`/api/expense/${id}`).then((data) => {
      console.log(data)
      readRangeExpenses(range)
    }).catch(err => console.log(err))
  }


  return (
    <ExpenseContext.Provider value={{expenses, range, setRange, setExpense, createExpense, editExpense,  deleteExpense, readRangeExpenses}}>
      {props.children}
    </ExpenseContext.Provider>
  )
}

