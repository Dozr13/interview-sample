SELECT expense_title, amount, bill_type, due_date, j.id FROM expenses e
JOIN expenses_junction j ON j.expenses_id = e.id
JOIN expenses_date d ON d.id = j.expenses_date_id
WHERE users_id = $1 AND due_date >= $2 AND due_date <= $3
ORDER BY due_date ASC;

-- ! RESEARCH
-- either convert to milisecond or convert search params