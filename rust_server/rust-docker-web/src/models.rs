use crate::schema::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct Reservation {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub insurance: String,
    pub appointment_date: String,
    pub birth_date: String,
    pub phone_number: String,
    pub created_at: chrono::NaiveDateTime,
    pub messages : String,
}

#[derive(Insertable, Debug)]
#[table_name = "reservations"]
pub struct NewReservation<'a> {
    pub first_name: &'a str,
    pub last_name: &'a str,
    pub email: &'a str,
    pub insurance: &'a str,
    pub appointment_date: &'a str,
    pub birth_date: &'a str,
    pub phone_number: &'a str,
    pub created_at: chrono::NaiveDateTime,
    pub messages : &'a str,
}

