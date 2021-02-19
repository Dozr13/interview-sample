SELECT url FROM backgrounds
JOIN bill_track_users u ON backgrounds.id = u.background_id
WHERE u.id = $1;