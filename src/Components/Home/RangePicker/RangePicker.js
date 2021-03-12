import React, {useState, useEffect, useContext} from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'

import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {addDays} from 'date-fns';


import '../Home.scss'

function RangePicker() {
  const userExpense = useContext(ExpenseContext)
  
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  const dayHandler = (item) => {
    setRange([item.selection])
    userExpense.setRange([item.selection])
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
          ranges={range}
          direction="vertical"
          scroll={{enabled: true}}
        />
      </div>
    </div>
  )
}

export default RangePicker
