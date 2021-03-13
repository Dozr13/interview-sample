UPDATE bill_track_users
SET email = $1, first_name = $2, last_name = $3, password = $4, profile_pic = $5
WHERE id = $6
RETURNING *;