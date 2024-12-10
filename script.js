const Tenant = require("./index");
const mongoose = require("mongoose");
const tenant = new Tenant("mongodb://localhost:27017/testdb");

(async () => {
  const db = await tenant.connect().then(() => {
    return tenant.connection;
  });
  console.log(db);

  // Perform operations with tenant.model
  await tenant.disconnect();
})();
