const mongoose = require("mongoose");

/**
 * Class Tenant
 * @class Tenant
 */
class Tenant {
  /**
   * @constructor
   * @param {string} tenantURI
   */
  constructor(tenantURI) {
    if (typeof tenantURI !== "string") {
      throw new Error("Tenant URI must be a string");
    }
    this.tenantURI = tenantURI;
  }

  /**
   * Connect to the database
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      if (this.connection) {
        throw new Error("Tenant connection already exists");
      }
      this.connection = await mongoose.createConnection(this.tenantURI);

      this.connection.on("open", () =>
        console.log(`Connected to ${this.tenantURI} database`)
      );
      this._id = this.connection?.db?.databaseName;
      return this.connection;
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error; // Re-throw for test cases or external error handling
    }
  }

  /**
   * Disconnect from the database
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      if (!this.connection) {
        throw new Error("Tenant connection does not exist");
      }
      await this.connection.close();
      console.log(`Disconnected from ${this.tenantURI}`);
    } catch (error) {
      console.error("Error disconnecting from the database:", error);
      throw error; // Re-throw for test cases or external error handling
    }
  }
}

// CommonJS export
module.exports = Tenant;

// Optional ES Module export
module.exports.default = Tenant;
