INSERT INTO expenses_date (due_date)
VALUES ($1)
RETURNING *;