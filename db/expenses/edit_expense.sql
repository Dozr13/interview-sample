UPDATE expenses_date
SET due_date = $1
WHERE id = $2;

UPDATE expenses
SET expense_title = $3, amount = $4, bill_type = $5
WHERE id = $6 AND users_id = $7
RETURNING *;