SELECT d.due_date, expense_title, amount, bill_type, j.id AS junction_id, e.id AS expenses_id, d.id AS expenses_date_id FROM expenses e
JOIN expenses_junction j ON j.expenses_id = e.id
JOIN expenses_date d ON d.id = j.expenses_date_id
WHERE e.id = $1;