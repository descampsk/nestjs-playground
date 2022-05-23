# Demo AWS App Runner

## Description

This repository contains a sample code to demonstrate the usage of AWS App runner and the CD associated.
It uses [Nest](https://github.com/nestjs/nest) framework.

It offer a single endpoint `GET /prime?limit=10` which answers with the list of prime numbers below the limit.

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

# Get the prime numbers
$ curl localhost:3000/prime?limit=100
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

```bash
# Connect to AWS ECR
$ make docker-login

# Build the image
$ make docker-build

# Run the image
$ make docker-run

# Push the image
$ make docker-push
```

## Copilot

```bash
# Export AWS configuration
$ export AWS_PROFILE=innovorder-lab
$ export AWS_REGION=eu-west-1

# Init the application
$ copilot init
# Welcome to the Copilot CLI! We're going to walk you through some questions
# to help you get set up with a containerized application on AWS. An application is a collection of
# containerized services that operate together.

# Application name: demo-aws-app-runner
# Workload type: Request-Driven Web Service
# Service name: app
# Manifest file for service app already exists. Skipping configuration.
# Ok great, we'll set up a Request-Driven Web Service named app in application demo-aws-app-runner.

# Init the environment
$ copilot env init --profile innovorder-lab
# Environment name: lab
# Default environment configuration? Yes, use default.

# Deploy
$ copilot deploy

# Delete
$ copilot app delete
```
