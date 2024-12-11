const Tenant = require("./index");
const mongoose = require("mongoose");
const tenant = new Tenant("mongodb://localhost:27017/testdb");

const manageTenantConnection = async () => {
  try {
    const db = await tenant.connect();
    console.log(db);
    await tenant.disconnect();
  } catch (error) {
    console.log(error);
  }
};

manageTenantConnection();
