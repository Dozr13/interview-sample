UPDATE expenses
SET expense_title = $2, amount = $3, bill_type = $4
WHERE id = $5 AND users_id = $6;

UPDATE expenses_date
SET due_date = $1
WHERE id = $7
RETURNING *;