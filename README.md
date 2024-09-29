# NestJS Playground

## Description

This is a playground to test the NestJS framework, try features and best practices, experiment Cloud Deployment. Your imagination is the limit.

## Features

All features are decoupled in modules, so you can enable or disable them easily.
There are located in [src/modules](/src/modules) folder.

To enable some features, you can use the variable `MODULES_ENABLED` in the `.env` file.

If you want all features, you can use the value `ALL` or let the variable empty.
If you want to enable only some features, you can use a comma separated list of the module names. Example: `MODULES_ENABLED=PrimeModule,Auth0Module`.

The available modules are:
- [PrimeModule](/src/modules/prime/): Simple controller to test Cloud Deployement with AWS APP Runner and Cloud Run.
- [Auth0Module](/src/modules/auth0/): Module to test the Auth0 integration with NestJS.

## Usage

```bash
# Install dependencies
$ npm install

# Run the app
$ npm run start:dev

# Run the unit test
$ npm run test
```

## Live environment

The project is deployed in Google Cloud Run.

### Google Cloud Run

The main url is [https://nestjs.playground.gcp.kevindescamps.com](https://nestjs.playground.gcp.kevindescamps.com).
The different module documentations are:
- [PrimeModule](https://nestjs.playground.gcp.kevindescamps.com/prime/docs/)
- [Auth0Module](https://nestjs.playground.gcp.kevindescamps.com/auth0/docs/)
