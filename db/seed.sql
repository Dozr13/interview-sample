
CREATE TABLE backgrounds (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200)
);

CREATE TABLE bill_track_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(150) NOT NULL,
  profile_pic VARCHAR(200),
  background_id INT REFERENCES backgrounds (id)
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  due_date DATE,
  expense_title VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  bill_type VARCHAR(30) NOT NULL,
  users_id INT REFERENCES bill_track_users (id) NOT NULL
);