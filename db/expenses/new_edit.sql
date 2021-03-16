UPDATE expenses
SET expense_title = $1, amount = $2, bill_type = $3
WHERE id = $4 AND users_id = $5
RETURNING *;