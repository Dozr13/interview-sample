SELECT expense_title, amount, bill_type, due_date, e.id FROM expenses e
JOIN expenses_junction j ON j.expenses_id = e.id
JOIN expenses_date d ON d.id = j.expenses_date_id
WHERE users_id = $1 AND d.due_date >= $2 AND d.due_date <= $3
ORDER BY d.due_date ASC;