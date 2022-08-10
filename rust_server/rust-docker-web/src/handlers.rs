use actix_web::Responder;
// use super::models::{NewReservation, Reservation};
use super::schema::reservations::dsl::*;
use super::Pool;
use crate::diesel::QueryDsl;
use crate::diesel::RunQueryDsl;
use diesel::expression_methods::ExpressionMethods;
use actix_web::{web, Error, HttpResponse};
use diesel::dsl::{delete, insert_into};
use serde::{Deserialize, Serialize};
use std::vec::Vec;

use crate::{schema::reservations, models::{Reservation, NewReservation}};

#[derive(Debug, Serialize, Deserialize)]
pub struct InputReservation {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub insurance: String,
    pub appointment_date: String,
    pub phone_number: String,
    pub birth_date: String,
    pub messages: String,
}

pub async fn get_reservations(db: web::Data<Pool>) -> Result<HttpResponse, Error> {
  println!("from GET Route" );

  Ok(web::block(move || get_all_reservations(db))
      .await
      .map(|reservation| HttpResponse::Ok().json(reservation))
      .map_err(|_| HttpResponse::InternalServerError())?)
}


 fn get_all_reservations(pool: web::Data<Pool>) -> Result<Vec<Reservation>, diesel::result::Error> {
  let conn = pool.get().unwrap();
  let items = reservations.load::<Reservation>(&conn)?;
  Ok(items)
}

pub async fn add_reservation(
  db: web::Data<Pool>,
  item: web::Json<InputReservation>,
) -> Result<HttpResponse, Error> {
  println!("{:?}" , item);
  Ok(web::block(move || add_single_reservation(db, item))
      .await
      .map(|reservation| HttpResponse::Created().json(reservation))
      .map_err(|_| HttpResponse::InternalServerError())?)
}

pub fn add_single_reservation(
  db: web::Data<Pool>,
  item: web::Json<InputReservation>,
) -> Result<Reservation, diesel::result::Error> {
  println!("{:#?}" , item);
  let conn = db.get().unwrap();
  let new_reservation = NewReservation {
      first_name: &item.first_name,
      last_name: &item.last_name,
      email: &item.email,
       insurance: &item.insurance,
       appointment_date: &item.appointment_date,
       phone_number: &item.phone_number,
       birth_date: &item.birth_date,
      created_at: chrono::Local::now().naive_local(),
      messages : &item.messages,
  };
  let res = insert_into(reservations).values(&new_reservation).get_result(&conn)?;
  Ok(res)
}

pub async fn delete_reservation(
  db: web::Data<Pool>,
  reservation_id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
  Ok(
      web::block(move || delete_single_reservation(db, reservation_id.into_inner()))
          .await
          .map(|user| HttpResponse::Ok().json(user))
          .map_err(|_| HttpResponse::InternalServerError())?,
  )
}

fn delete_single_reservation(db: web::Data<Pool>, reservation_id:  i32) -> Result<usize, diesel::result::Error> {
  let conn = db.get().unwrap();
  let count = delete(reservations.find(reservation_id)).execute(&conn)?;
  Ok(count)
}



//get_reservation_by_email

pub async fn get_reservation_by_email(
  db: web::Data<Pool>,
  user_email: web::Path<String>,
) -> Result<HttpResponse, Error> {
  Ok(
      web::block(move || db_get_reservation_by_email(db, user_email.into_inner()))
          .await
          .map(|reservation| HttpResponse::Ok().json(reservation))
          .map_err(|_| HttpResponse::InternalServerError())?,
  )
}

fn db_get_reservation_by_email(pool: web::Data<Pool>, user_email: String) -> Result<Vec<Reservation>, diesel::result::Error> {
  let conn = pool.get().unwrap();
  // reservations.filter(email.eq(user_email)).get_result::<Reservation>(&conn)

  let items = reservations.filter(email.eq(user_email)).load::<Reservation>(&conn)?;
  Ok(items)

}
