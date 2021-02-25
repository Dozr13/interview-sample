let errMsg = "Oops! Something went wrong. Our engineers have been informed and will get the issue patched up right away, thank you for your patience!"

module.exports = {
  readExpenses: async (req, res) => {
    // console.log(req)
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

  readDayExpense: async (req, res) => {
    // console.log('click', req.body)
    const {id} = req.session.user
    const {dueDate} = req.body
    const db = req.app.get('db')
    if (dueDate){
      if(dueDate.day <= 9){
        dueDate.day = `0${dueDate.day}`
      } 
      if(dueDate.month <= 9){
        dueDate.month = `0${dueDate.month}`
      } 
      const date = `${dueDate.year}-${dueDate.month}-${dueDate.day}`
      // console.log(date, typeof date)
      db.expenses.read_day_expenses(id, date)
        .then(expenses => res.status(200).send(expenses))
        .catch(errMsg => console.log(errMsg))
    }
  },

  // 2021-02-23T17:00:00.000-07:00

  // Passes Postman tests
  createExpense: (req, res) => {
    // console.log('create', req.body)

    const db = req.app.get('db')
    const {id} = req.session.user
    const {dueDate, expenseTitle, amount, billType} = req.body
    // console.log(dueDate)
    if(id){
      console.log(dueDate, typeof dueDate)
      db.expenses.create_expense([dueDate, expenseTitle, amount, billType, id])
        .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
        .catch(errMsg => console.log(errMsg))
    }
  },

  // Passes Postman test
  // ! Later edit if 1 item is left blank, currently throws typeError.
  editExpense: async (req, res) => {
    const {dueDate, expenseTitle, amount, billType} = req.body
    const bill = await req.app.get('db').expenses.read_expense([req.params.id, req.session.user.id])[0]
    // let newBill = [due_date: due_date || bill.due_date, expense_title: expense_title || bill.expense_title, amount: amount || bill.amount, bill_type: bill_type || bill.bill_type]
    let dd = dueDate || bill.dueDate
    let et = expenseTitle || bill.expenseTitle
    let am = amount || bill.amount
    let bt = billType || bill.billType
    // console.log(newBill)
    req.app.get('db').expenses.edit_expense ([new Date(dd), et, am, bt, req.params.id, req.session.user.id]) 
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

  // Passes Postman tests
  deleteExpense: (req, res) => {
    req.app.get('db').expenses.delete_expense([req.params.id, req.session.user.id])
      .then(_ => res.sendStatus(200))
      .catch(errMsg => console.log(errMsg))
  }
}