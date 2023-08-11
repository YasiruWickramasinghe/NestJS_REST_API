## Description

NestJS_REST_API" is a robust backend framework leveraging TypeScript for building efficient and scalable RESTful APIs

## Technology

PostgreSQL
Prisma
PassportJS
JWT
Docker

## API Endpoint 

Please utilize the src/endpoints/endpoints.json file directory to read and validate the provided endpoints.

## Setup MySQL or Postgre

1. change docker-compose.yml file
2. change .env file
3. change schema.prisma file

4. if docker previosly up then down your docker using run this command

    docker-compose down  

5. then re up docker container using run this command

    docker-compose up -d

6. then if previously create migration delete that files and run this command

    npx prisma migrate dev
    npx prisma migrate deploy

7.  then generate prisma using run this command
    
    npx prisma generate 

8. finally run project using run this command

    npm run start:dev 

9. you can check database using prisma studio      

    npx prisma studio

10. finally check using postman    


## Resourse

FreeCodeCamp - Create a REST API


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov




