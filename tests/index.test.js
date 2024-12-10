const mongoose = require("mongoose");
const Tenant = require("../index"); // Adjust this path to point to your Tenant class file

describe("Tenant", () => {
  const tenantURI = "mongodb://localhost:27017/testdb";
  let tenant;

  beforeEach(() => {
    tenant = new Tenant(tenantURI);
  });

  afterEach(async () => {
    if (tenant.connection) {
      await tenant.disconnect();
    }
  });

  afterAll(async () => {
    // Close the default Mongoose connection to avoid Jest hanging
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  test("should connect to the database", async () => {
    await tenant.connect();
    expect(tenant.connection).not.toBeNull();
    expect(tenant.connection).toBe("testdb");
  });

  test("should throw error if connecting when already connected", async () => {
    await tenant.connect();
    await expect(tenant.connect()).rejects.toThrow(
      "Tenant connection already exists"
    );
  });

  test("should disconnect from the database", async () => {
    await tenant.connect();
    await tenant.disconnect();
    expect(tenant.connection).toBeNull(); // Ensure the connection is nullified
  });

  test("should throw error if disconnecting when not connected", async () => {
    await expect(tenant.disconnect()).rejects.toThrow(
      "Tenant connection does not exist"
    );
  });
});
