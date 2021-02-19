SELECT e.id AS expense_id, due_date, expense_title, amount, bill_type FROM expenses e
WHERE e.id = $1 AND e.users_id = $2