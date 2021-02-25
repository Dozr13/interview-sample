INSERT INTO expenses (expense_title, amount, bill_type, users_id)
VALUES ($1, $2, $3, $4)
RETURNING *;