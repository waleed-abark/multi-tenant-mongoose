# Multi-Tenant Mongoose

## Overview

The `multi-tenant-mongoose` library provides a simple way to manage multiple tenant connections using Mongoose. It allows you to create and manage separate database connections for each tenant, ensuring isolation and organization of your data.

## Installation

To install the library, use npm:

```bash
npm install multi-tenant-mongoose
```

## Usage

### Tenant Class

The `Tenant` class manages a single tenant connection. It takes a MongoDB URI as a parameter and provides methods to connect and disconnect.

#### Constructor

```javascript
const tenant = new Tenant(tenantURI);
```

- `tenantURI`: A string representing the MongoDB connection URI for the tenant.

#### Methods

- **connect(): Promise<void>**

  Connects to the tenant's MongoDB database. If a connection already exists, it throws an error.

  ```javascript
  tenant.connect().then(() => {
    console.log('Connected successfully');
  }).catch((error) => {
    console.error('Connection error:', error);
  });
  ```

- **disconnect(): Promise<void>**

  Disconnects from the tenant's MongoDB database. If no connection exists, it throws an error.

  ```javascript
  tenant.disconnect().then(() => {
    console.log('Disconnected successfully');
  }).catch((error) => {
    console.error('Disconnection error:', error);
  });
  ```

### Example

```javascript
const Tenant = require('./tenant');

const tenantURI = 'mongodb://your-tenant-uri';
const tenant = new Tenant(tenantURI);

async function manageTenantConnection() {
  try {
    await tenant.connect();
    // Perform operations with tenant.model
  } finally {
    await tenant.disconnect();
  }
}

manageTenantConnection();
```

## Dependencies

- [mongoose](https://www.npmjs.com/package/mongoose): ^8.8.4
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.4.7
- [nodemon](https://www.npmjs.com/package/nodemon): ^3.1.7

## License

This project is licensed under the ISC License.
