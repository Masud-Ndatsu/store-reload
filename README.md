# Store Reload Web Service

Welcome to the documentation for the StoreReload Backend API. This API provides
a comprehensive set of endpoints to power the storereload admin web
application and mobile application. This README file will guide you through
the setup and usage of the API.

## Table of Contents

-    Prerequisites
-    Installation
-    Configuration
-    Usage
-    API Documentation
-    Authentication

## Prerequisites

To run the ecommerce backend API, make sure you have the following prerequisites
installed on your system:

-    Node.js (v12 or higher)
-    yarn (Yarn Package Manager)
-    MongoDB

## Installation

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the cloned repository.
3. Install the dependencies by running the following command:

```console
yarn install
```

4. Create a `.env` file in the root directory and provide the required
   environment variables (see the Configuration section for details).

5. For Mac and Linux - Start mongodb in shell

6. Start the server by running the following command:

```console
yarn dev
```

## Configuration

The API requires certain configuration settings. Create a `.env` file in the
root directory and set the following environment variables:

-    `PORT`: The port number on which the API will run (default: 3000).
-    `MONGODB_URI`: The connection URI for your MongoDB database.

Example `.env` file:

```.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/storereload
```

## Usage

Once the server is running, you can access the API using a tool like Postman or
by sending HTTP requests using your preferred method.

By default, the API will be available at http://localhost:5000.

## API Documentation

The storereload backend API exposes the following endpoints:

SWAGGER DOCS: http://localhost:5000/api-docs

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected
routes, include an Authorization header in your requests with the value Bearer
{token}. The token can be obtained by logging in or signing up as a user.
