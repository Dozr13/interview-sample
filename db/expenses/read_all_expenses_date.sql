SELECT e.id AS expense_id, due_date, expense_title, amount, bill_type FROM expenses e
JOIN bill_track_users u ON u.id = e.users_id
WHERE u.id = $1 AND due_date BETWEEN $2 AND $3
ORDER BY due_date ASC;

-- ! RESEARCH
-- either convert to milisecond or convert search params