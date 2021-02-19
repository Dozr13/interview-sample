UPDATE expenses 
SET due_date = $1, expense_title = $2, amount = $3, bill_type = $4
WHERE id = $5 AND users_id = $6
RETURNING *;