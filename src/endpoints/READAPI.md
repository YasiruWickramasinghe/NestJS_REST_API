# API Documentation

Postman Documentation import and check endpoints

## Base URL

The base URL for all API endpoints is: `http://localhost:5000`.

## Endpoints

## User Authentication

This API module allows you to manage user authentication and user-related operations.

### Sign Up

Register a new user.

- **Endpoint**: `POST /auth/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "john@gmail.com",
    "password": "john@99",
    "userRole": "admin",
    "firstName": "john",
    "lastName": "deo"
  }

### Sign In

Log in a user and obtain access tokens.

- **Endpoint**: `POST /auth/signin`
- **Description**: Log in a user and obtain access  tokens.
- **Request Body**:
  ```json
  {
    "email": "john@gmail.com",
    "password": "john@99"
  }

### Update User

Update user profile information.

- **Endpoint**: `PATCH /users/1`
- **Description**: Update user profile information.
- **Headers**:
  - Authorization: Bearer `<access_token>`
- **Request Body**:
  ```json
  {
    "email": "david@gmail.com",
    "password": "david@99",
    "userRole": "admin",
    "firstName": "david",
    "lastName": "bekam"
  }

### Get User

Get the current user's profile details.

- **Endpoint**: `GET /users/me`
- **Description**: Get the current user's profile details.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Get All Users

Retrieve a list of all users.

- **Endpoint**: `GET /users/`
- **Description**: Retrieve a list of all users.
- **Headers**:
  - Authorization: Bearer `<access_token>`


## Bookmarks Management

### Create Bookmark

Create a new bookmark.

- **Endpoint**: `POST /bookmarks`
- **Description**: Create a new bookmark.
- **Headers**:
  - Authorization: Bearer `<access_token>`
- **Request Body**:
  ```json
  {
    "title": "powers",
    "description": "must read book",
    "link": "www.rings.com"
  }

### Get All Bookmarks

Retrieve a list of all bookmarks.

- **Endpoint**: `GET /bookmarks`
- **Description**: Retrieve a list of all bookmarks.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Get Bookmarks by User Id

Retrieve bookmarks for a specific user.

- **Endpoint**: `GET /bookmarks/user`
- **Description**: Retrieve bookmarks for a specific user.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Get Bookmark by Bookmark Id

Retrieve a specific bookmark by its ID.

- **Endpoint**: `GET /bookmarks/6`
- **Description**: Retrieve a specific bookmark by its ID.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Edit Bookmark by Id

Update a specific bookmark by its ID.

- **Endpoint**: `PATCH /bookmarks/6`
- **Description**: Update a specific bookmark by its ID.
- **Headers**:
  - Authorization: Bearer `<access_token>`
- **Request Body**:
  ```json
  {
    "title": "potter",
    "description": "book must read",
    "link": "www.potter.com"
  }

### Delete Bookmark by Id

Delete a specific bookmark by its ID.

- **Endpoint**: `DELETE /bookmarks/6`
- **Description**: Delete a specific bookmark by its ID.
- **Headers**:
  - Authorization: Bearer `<access_token>`


## Environment Variables

The following environment variables are used in the project:

- `DATABASE_URL`: Mysql connection URI.
- `JWT_SECRET`: provide secret key.
