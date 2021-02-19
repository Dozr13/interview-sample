SELECT e.id AS expense_id, due_date, expense_title, amount, bill_type FROM expenses e
JOIN bill_track_users u ON u.id = e.users_id
WHERE u.id = $1
ORDER BY due_date ASC;