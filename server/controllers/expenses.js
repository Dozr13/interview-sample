let errMsg = "Oops! Something went wrong. Our engineers have been informed and will get the issue patched up right away, thank you for your patience!"

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
console.log(dueDate)
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
console.log('read expenses ctrl', expenses) 
        res.status(200).send(expenses)
      })
      .catch(errMsg => console.log(errMsg))
    }
  },
  
  // ! Used in TableView.js to delete expenses from db
  deleteExpense: (req, res) => {
    const db = req.app.get('db')
// console.log(req.params, req.session.user)
    db.expenses.delete_expense([req.params.id, req.session.user.id])
      .then(_ => {
        db.expenses.read_day_expenses(req.session.user.id, req.params.due_date)
        .then(expenses => {
console.log('delete expenses ctrl', expenses) 
          res.status(200).send(expenses)
        })
        .catch(errMsg => console.log(errMsg))
      })
      .catch(errMsg => console.log(errMsg))
  },
  





    readExpenses: async (req, res) => {
      const {id} = req.session.user;
      const {start, end} = req.body;
      const db = await req.app.get('db')
      if (start && end){
        db.expenses.read_all_expenses_date(id, start, end)
        .then(expenses => res.status(200).send(expenses))
        .catch(errMsg => console.log(errMsg))
      } else if (start){
        db.expenses.read_all_expenses_date(id, start, Date.now())
        .then(expenses => res.status(200).send(expenses))
        .catch(errMsg => console.log(errMsg))
    } else {
      db.expenses.read_all_expenses(id)
        .then(expenses => res.status(200).send(expenses))
        .catch(errMsg => console.log(errMsg))
    }
  },


  // Passes Postman test
  editExpense: async (req, res) => {
    const {dueDate, expenseTitle, amount, billType} = req.body
    const bill = await req.app.get('db').expenses.read_expense([req.params.id, req.session.user.id])[0]
    // let newBill = [due_date: due_date || bill.due_date, expense_title: expense_title || bill.expense_title, amount: amount || bill.amount, bill_type: bill_type || bill.bill_type]
    let date = dueDate || bill.dueDate
    let title = expenseTitle || bill.expenseTitle
    let price = amount || bill.amount
    let type = billType || bill.billType
    // console.log(newBill)
    req.app.get('db').expenses.edit_expense ([new Date(date), title, price, type, req.params.id, req.session.user.id]) 
    .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
    .catch(errMsg => console.log(errMsg))
  },

  // Passes Postman tests
  readExpense: (req, res) => {
    // console.log('read')
    req.app.get('db').expenses.read_expense([req.params.id, req.session.user.id])
      .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
      .catch(errMsg => console.log(errMsg))
  },

}