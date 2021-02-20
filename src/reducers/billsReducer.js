import axios from 'axios'

const initialState = {
  dueDate: new Date(),
  expenseTitle: null,
  amount: [],
  billType: []
}

const REQUEST_BILLING_DATA = 'REQUEST_BILLING_DATA'
const ADD_BILL = 'ADD_BILL'
const REMOVE_BILL = 'REMOVE_BILL'


export const requestBillingData = () => {
  let data = axios
  .get('/api/expenses-data')
  .then(res => res.data)
    return{
      type: REQUEST_BILLING_DATA,
      payload: data
    }
}

export const addBill = (dueDate, expenseTitle, amount, billType) => {
  let data = axios
  .post('/api/new-expense', {
    dueDate,
    expenseTitle,
    amount,
    billType
  }).then(res => res.data)
    return {
      type: ADD_BILL,
      payload: data
    }
}

export const removeBill = (id) => {
  let data = axios
  .delete(`/api/expense/${id}`)
  .then(res => res.data)
    return{
      type: REMOVE_BILL,
      payload: data
    }
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case REQUEST_BILLING_DATA + '_PENDING':
      return {...state, loading: true}
    case REQUEST_BILLING_DATA + '_FULFILLED':
      return {...state, ...action.payload, loading: false}
    case ADD_BILL + '_PENDING':
      return {...state, loading: true}
    case ADD_BILL + '_FULFILLED':
      return {...state, bills: action.payload}
    case REMOVE_BILL + '_PENDING':
      return { ...state, loading: true }
    case REMOVE_BILL + '_FULFILLED':
      return { ...state, purchases: action.payload, loading: false }
    default:
      return state
  }
}