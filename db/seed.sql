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


CREATE TABLE expenses_date (
  id SERIAL PRIMARY KEY,
  due_date VARCHAR(200) NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  expense_title VARCHAR(200) NOT NULL,
  amount NUMERIC NOT NULL,
  bill_type VARCHAR(200) NOT NULL,
  users_id INT REFERENCES bill_track_users (id) NOT NULL
);

CREATE TABLE expenses_junction (
  id SERIAL PRIMARY KEY,
  expenses_date_id INT REFERENCES expenses_date (id) NOT NULL,
  expenses_id INT REFERENCES expenses (id) NOT NULL
);
