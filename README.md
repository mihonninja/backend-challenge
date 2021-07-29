# backend-challenge

## Installing dependencies

`npm install`

## Configuration

All configuration should be stored within .env file, which should be cloned from .example.env

## Docker image for MongoDB

To simplify initial configuration I've used docker image for MongoDB. It can be easily removed with any native MongoDB server implementation.

To start mongo type `docker-compose up`. To stop use `docker-compose down`. (Can be reused via docker dashboard after first run)

## Run application

Type `npm start` to run application, when ready.

## Tests

Some initial scenarios for each route stored can be run using `npm run test:api`
