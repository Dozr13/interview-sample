-- SELECT e.id AS expense_id, due_date, expense_title, amount, bill_type FROM expenses e
-- WHERE e.id = $1 AND e.users_id = $2



SELECT d.due_date, expense_title, amount, bill_type, j.id, d.id AS expenses_date_id FROM expenses e
JOIN expenses_junction j ON j.expenses_id = e.id
JOIN expenses_date d ON d.id = j.expenses_date_id
WHERE j.id = $1;