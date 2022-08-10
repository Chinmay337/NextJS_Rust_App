mod auth;
mod handlers;
mod errors;
mod models;
mod schema;

//  use std::error::Error;
use actix_web::{ dev::ServiceRequest, Error, get, web, App, HttpServer, Responder , HttpResponse};
use diesel::r2d2::ConnectionManager;
use diesel::PgConnection;

use actix_web_httpauth::extractors::bearer::{BearerAuth, Config};
use actix_web_httpauth::extractors::AuthenticationError;
use actix_web_httpauth::middleware::HttpAuthentication;



pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, Error> {
    let config = req
        .app_data::<Config>()
        .map(|data| data.get_ref().clone())
        .unwrap_or_else(Default::default);
    match auth::validate_token(credentials.token()) {
        Ok(res) => {
            if res == true {
                Ok(req)
            } else {
                Err(AuthenticationError::from(config).into())
            }
        }
        Err(_) => Err(AuthenticationError::from(config).into()),
    }
}

async fn validator2(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, Error> {
    if credentials.token() == "mF_9.B5f-4.1JqM" {
        Ok(req)
    } else {
        let config = req.app_data::<Config>()
            .map(|data| data.get_ref().clone())
            .unwrap_or_else(Default::default)
            .scope("urn:example:channel=HBO&urn:example:rating=G,PG-13");

            Err(AuthenticationError::from(config).into())
    }
}




#[actix_rt::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "actix_web=debug");

    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

use actix_cors::Cors;
use actix_web::http::header;




       // create db connection pool
       let manager = ConnectionManager::<PgConnection>::new(database_url);
       let pool: Pool = r2d2::Pool::builder()
           .build(manager)
           .expect("Failed to create pool.");


    let auth = HttpAuthentication::bearer(validator);
    
    // Start http server
    HttpServer::new(move || {

    //     let cors = Cors::default()
    // .allowed_origin("*")
    // .allowed_methods(vec!["GET", "POST"])
    // .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
    // .allowed_header(header::CONTENT_TYPE)
    // .max_age(3600);

    // let cors = Cors::permissive();


        App::new()
        .wrap(Cors::new()
        .allowed_methods(vec!["GET", "POST"])
        .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
        .allowed_header(header::CONTENT_TYPE)
        .max_age(3600).finish())
            .data(pool.clone())
            .wrap(auth.clone())
            .route("/reservation", web::get().to(handlers::get_reservations))
            .route("/reservation", web::post().to(handlers::add_reservation))
            .route("/reservation/{email}", web::get().to(handlers::get_reservation_by_email))

    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}

#[macro_use]
extern crate diesel;


