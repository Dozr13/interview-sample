DELETE FROM expenses
WHERE id = $1 AND users_id = $2;