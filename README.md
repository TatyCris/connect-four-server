# Connect-Four-Server
This game project is the server side of a full stack web-application.

## Table of contents
- [Intro](#Intro)
- [Technologies used](#Technologies-used)
- [Setup](#Setup)
- [API](#API)

## Intro
This is a node.js server for the Connect Four real world project game - which was created and worked during week 7 of the Codaisseur Academy.

The Front-end for the following repo may be found [here](https://github.com/TatyCris/connect-four-client)

The Backend is deployed to heroku [here](
https://server-connect-four.herokuapp.com)

## Technologies used
- PostgreSQL
- Express
- Sequelize

## Setup
Please note that in order to run the server locally you must also start a Postgres container using the following commands

```bash
$ docker run \
  --rm \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres
```
  
- git clone
```bash
$ git clone https://github.com/TatyCris/connect-four-server.git
```

- npm install
```bash
$ npm install
```

- npm run dev
```bash
$ npm run dev
```

## API

MODELS:
- Users -> registered users
- Rooms -> rooms created by users
- Columns -> columns of a game board

ENDPOINTS:
\<base url\> is either http://localhost:5000 for local development or https://server-connect-four.herokuapp.com for the deployed backend.
</br>

Create an user:
- POST \<base url\>/users

Get a token:
- POST \<base url\>/login

Authenticate an user:
- GET \<base url\>/authentication

Create a room:
- POST \<base url\>/rooms

Modify an user:
- PUT \<base url\>/users/:id

Get all rooms:
- GET \<base url\>/rooms

Get a room:
- GET \<base url\>/rooms/:id

Modify a room:
- PUT \<base url\>/rooms/:id

Get a board:
- GET \<base url\>/rooms/:id/columns

Modify a board:
- PUT \<base url\>/rooms/:id/columns
