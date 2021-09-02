# Movies-APP

Welcome to version 1 of Movies-App API.

# Objetive

Provide a platform that contains the best information about a movies and tv shows

## Requeriments

### Instalar Git

    Follow the steps to install git according to your operating system.
    https://git-scm.com/book/es/v1/Starting-Installing-Git

### Install NodeJS

    Follow the steps to install NodeJs according to your operating system.
    https://nodejs.org/es/download/

### Clone Repo

    Go to the preferred folder, open the terminal and run:
    git clone https://github.com/iChris96/movies-app.git

## Install dependencies

    To install the dependencies run:
    npm install

## Run API

    To run the API:
    npm start

## Routes

### Movies

| Path             | Verb | Description                                                                                                 |
| ---------------- | :--: | ----------------------------------------------------------------------------------------------------------- |
| /movies/discover | GET  | Discover movies by different types of data like average rating, number of votes, genres and certifications. |

### Auth

| Path               | Verb | Description                              |
| ------------------ | :--: | ---------------------------------------- |
| /auth/signup       | POST | Create a movies-app account              |
| /auth/signin       | POST | Authenticate account and get credentials |
| /auth/refreshtoken | POST | Refresh expired token with a new one     |
| /auth/account      | GET  | Get account info by token                |
