import React, {useState} from 'react'
import Creatable, {makeCreatableSelect} from 'react-select/creatable'
import './Dropdown.scss'


function Dropdown() {
  const [options] = useState([
    {
      label: 'Mortgage',
      value: 'Mortgage'
    },
    {
      label: 'Gas',
      value: 'Gas'
    },
    {
      label: 'Health Insurance',
      value: 'Health Insurance'
    },
    {
      label: 'Auto Insurance',
      value: 'Auto Insurance'
    },
    {
      label: 'Medical Expenses',
      value: 'Medical Expenses'
    },
    {
      label: 'Electricity',
      value: 'Electricity'
    },
    {
      label: 'Water',
      value: 'Water'
    },
    {
      label: 'Cell Phone',
      value: 'Cell Phone'
    },
    {
      label: 'Garbage',
      value: 'Garbage'
    },
    {
      label: 'Automotive Payment',
      value: 'Automotive Payment'
    },
    {
      label: 'Internet',
      value: 'Internet'
    },
    {
      label: 'Miscellaneous',
      value: 'Miscellaneous'
    }
    
  ]);

  return(
    <div className='selector'>
      <Creatable placeholder='Expense Type' options={options}/>
    </div>
  )
}


export default Dropdown
