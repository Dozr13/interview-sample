import React, {useEffect, useImperativeHandle, useState, forwardRef, useCallback, useContext} from 'react'
import { createPortal } from 'react-dom'
import {ExpenseContext} from '../../../Context/ExpenseContext'
import { TextField } from '@material-ui/core';
import Dropdown from './Dropdown-Menu/Dropdown'


const modalElement = document.getElementById('modal-root')

function AddExpense({children, fade = false, defaultOpened = false}, ref) {
  const userExpense = useContext(ExpenseContext)

  const [isOpen, setIsOpen] = useState(defaultOpened)
  const close = useCallback(() => setIsOpen(false), [])
  
  const [dueDate, setDate] = useState('')
  const [expenseTitle, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [billType, setType] = useState('')
  
  
  const createExpense = () => {
    userExpense.createExpense(dueDate, expenseTitle, amount, billType)
    setDate('')
    setTitle('')
    setAmount('')
    setType('')
  }
  
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close])


  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])


  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  
  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
          <div className='background-container'>

          </div>
        <div className="modal-body">
          <h2 className='modal-font'>Add a new expense</h2>
     
    <div className='flex-add'>
      <div className='add-inputs'>

        <TextField
          type='date'
          label='Set a Due Date'
          InputLabelProps={{shrink: true}}
          value={dueDate}
          onChange={(e) => setDate(e.target.value)}
          />
        <TextField 
          type='text'
          placeholder='Expense Name'
          value={expenseTitle}
          onChange={(e) => setTitle(e.target.value)}
          />
        <TextField
          type='text'
          placeholder='Amount'
          value={amount}
          onInput={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
          />

        <div className='drop-down'>
          <div className='center'>
            <Dropdown value={Dropdown.selectedOption} getValue={setType} />
          </div>
        </div>

  </div>
        <button onClick={createExpense}>Add Expense</button>

    </div>
    </div>
          <span role="button" className="modal-close" aria-label="close" onClick={close}>
            X
          </span>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(AddExpense)
