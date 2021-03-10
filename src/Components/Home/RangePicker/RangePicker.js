import React, {useState, useEffect, useContext} from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'

import {DateRangePicker} from 'react-date-range';
import {addDays} from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import '../Home.scss'

function RangePicker() {
  const userExpense = useContext(ExpenseContext)
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    },
    
  ]);

  useEffect(() => {
// console.log(selectionRange.startDate, selectionRange.endDate)
    userExpense.readRangeExpenses(selectionRange)
  }, [])



  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const dayHandler = (item) => {
  console.log(item)
    setState([item.selection])
    userExpense.readRangeExpenses(item.selection)
  }

  return (
    <div>
      <div className='background-box'>
        <DateRangePicker
          onChange={dayHandler}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="vertical"
          scroll={{enabled: true}}
        />
      </div>
    </div>
  )
}

export default RangePicker
