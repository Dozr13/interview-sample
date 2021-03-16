module.exports = {
  // ! Used in Expense.js
  createExpense: async (req, res) => {
    try {
    const db = req.app.get('db')
    const {id} = req.session.user
    const {dueDate, expenseTitle, amount, billType} = req.body
    const [checkDate] = await db.expenses_date.check_date(dueDate)
console.log({checkDate})
      if(checkDate){
        const [expense] = await db.expenses.create_expense([expenseTitle, amount, billType, id])
console.log({expense})
        await db.expense_junction.create_expense_junction(checkDate.id, expense.id)
         const expenses = await db.expenses.read_day_expenses(req.session.user.id, dueDate)
console.log('create expenses ctrl') 
console.log(expenses)
            res.status(200).send(expenses)
        } else {
          const [checkDate] = await db.expenses_date.create_date(dueDate)
          const [expense] = await db.expenses.create_expense([expenseTitle, amount, billType, id])
console.log({expense})
          await db.expense_junction.create_expense_junction(checkDate.id, expense.id)
           const expenses = await db.expenses.read_day_expenses(req.session.user.id, dueDate)
           res.status(200).send(expenses)
        }} 
        catch(err) {
          console.log(err)
          res.status(500).send(err)
        }},
  
  
  // ! Used to display expenses of selected date
  readDayExpense: async (req, res) => {
// console.log('click', req.body)
    const {id} = req.session.user
    const {dueDate} = req.body
// console.log(dueDate)
    const db = req.app.get('db')
    if (dueDate){
      if(dueDate.day <= 9){
        dueDate.day = `0${dueDate.day}`
      } 
      if(dueDate.month <= 9){
        dueDate.month = `0${dueDate.month}`
      } 
      const date = `${dueDate.year}-${dueDate.month}-${dueDate.day}`
// console.log('isItString', id, date, typeof date)
      db.expenses.read_day_expenses(id, date)
      .then(expenses => {
// console.log('read expenses ctrl', expenses) 
        res.status(200).send(expenses)
      })
      .catch(err => console.log(err))
    }
  },
  
  // ! Used in TableView.js to delete expenses from db
  deleteExpense: (req, res) => {
    const db = req.app.get('db')
// console.log('delete', req.params, req.session.user)
    db.expenses.delete_expense([+req.params.id, req.session.user.id])
      .then(_ => {
          res.sendStatus(200)
        })
        .catch(err => console.log(err))
  },
  


    readRangeExpenses: async (req, res) => {
// console.log('rangesssss', req.body)
      const {id} = req.session.user;
      const {startDate, endDate} = req.body;
console.log('read range', startDate, endDate)
      const db = await req.app.get('db')
      if (startDate && endDate){
        db.expenses.read_all_expenses_date(id, startDate, endDate)
        .then(expenses => res.status(200).send(expenses))
        .catch(err => console.log('1', err))
      } else if (startDate){
        db.expenses.read_all_expenses_date(id, startDate, new Date())
        .then(expenses => res.status(200).send(expenses))
        .catch(err => console.log('2', err))
    }
  },


  // Passes Postman test
  // ! Still not saving edit!
  editExpense: async (req, res) => {
    const {dueDate, expenseTitle, amount, billType} = req.body
// console.log({dueDate, expenseTitle, amount, billType})
// console.log('edit-controller 1', req.params.id, req.session.user)
// console.log(req.body)
    const [bill] = await req.app.get('db').expenses.read_expense([req.params.id])
// console.log('edit2', bill)
    let date = dueDate || bill.due_date
    let title = expenseTitle || bill.expense_title
    let price = amount || bill.amount
    let type = billType || bill.bill_type
// console.log(date, bill.expenses_date_id, title, price, type, req.params.id, req.session.user.id)
    req.app.get('db').expenses.edit_expense([date, bill.expenses_date_id, title, price, type, req.params.id, req.session.user.id])
    .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
    .catch(err => console.log(err))
  },

  // newEdit: async (req, res) => {
  //   const {expenseTitle, amount, billType} = req.body
  //   console.log(req.body)    
  //   const [expense] = await req.app.get('db').expenses.new_edit([expenseTitle, amount, billType, req.params.id, req.session.user.id])
  //   console.log(expense)
  //   res.sendStatus(200)
  // }
}