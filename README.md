# Sequelize Bridge Cloud Function in Javascript as Microservice

This repository contains the Bridge CF project, which is designed to handle database operations through a microservice architecture. The project uses Sequelize for ORM and Google Cloud Functions for serverless execution.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Functions](#functions)
- [Controllers](#controllers)
- [Utilities](#utilities)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/sequelize-microservice-agent.git
   cd sequelize-microservice-agent
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Rename `example.env` to `.env` and set the variables as per your needs.

   ```sh
   cp example.env .env
   ```

## Usage

### In development:

```sh
npm run dev
```

### In Production:

Deploy the function to Google Cloud Functions:

```sh
gcloud functions deploy bridge --runtime nodejs14 --trigger-http --allow-unauthenticated
```

## Environment Variables

Set the following environment variables in your `.env` file:

```sh
MYSQL_HOST=your_mysql_host
MYSQL_DB=your_mysql_database
MYSQL_USER=your_mysql_user
MYSQL_PASS=your_mysql_password
MYSQL_POOL_MAX=10
MYSQL_POOL_MIN=0
MYSQL_POOL_ACQUIRE=3600
MYSQL_POOL_IDLE=1000
```

## Functions

### Bridge Function

The main function of the project is the `bridge` function, which handles HTTP requests and performs database operations based on the request payload.

Example request payload:

```json
{
    "mode": "db",
    "action": {
        "model": "YourModel",
        "operation": "create",
        "payload": {
            "key": "value"
        }
    }
}
```

## Controllers

### BaseController

The `BaseController` class provides static methods for common database operations such as `read`, `create`, `bulkcreate`, `update`, and `delete`.

Example usage:

```javascript
const result = await BaseController.create(queryParameters, "YourModel", payload);
```

## Utilities

### Util

The `Util` class provides utility functions such as `validateInvokeSchema` for validating request payloads and `convertStringToObject` for converting strings to objects.

Example usage:

```javascript
const isValid = Util.validateInvokeSchema(payload);
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

This project was inspired by the following resources:

* [Sequelize](https://sequelize.org/)
* [Google Cloud Functions](https://cloud.google.com/functions)

Feel free to contact me on support@hassankhurram.com if you have any questions or suggestions or raise an issue if needed.
