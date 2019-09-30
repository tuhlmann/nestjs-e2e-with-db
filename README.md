<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

This repo exists to demonstrate a problem I have testing a NestJS custom repository against a real database.
Everything compiles fine.

When Jest runs the test, it first tries to create a task in the db, and then tries to read it.
No exception is thrown, but the task has not been created and the followup expect clause fails.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev:server
```

## Test

```bash
# unit tests
$ npm run test
```
