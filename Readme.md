# Readme!

## Prerequisites

- Docker desktop and Docker CLI

## Running

- First build by using `docker-compose build`
- Run app by using `docker-compose up`
- Stop app by running `docker-compose down`

```
Note:
First build might take a long time for the Rust binary to build
```

## Once Container is Running

- **Frontend** : Port `8122` -> visit `localhost:8122` for NextJS Frontend
- **Backend** : Port `8111` -> Rust backend running on port `8111`
- **Database** : Port `5432` -> PostgreSQL DB running on port `5432`

## App Overview

- **Create account** and login in order to Create Appointments and View their own Appointments
- **Admin:** **_login_** `cb.kalz@gmail.com` and **_pass_**: `Password123!` to login as Admin and view all Patient Appointments

## Components

- `NextJS` & `Typescript` for Frontend
- Auth0 for JWT Authentication
- Page Animations using `Framer Motion` , CSS Framework `TailwindCSS`
- `Rust` backend using `Actix` as the web server framework and handling middleware and JWT validation
- `PostgreSQL` relational DB for the data persistence
- `docker-compose` for Container Orchestration and `Dockerfile`'s for containerization
