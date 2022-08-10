CREATE TABLE reservations (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  insurance TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);