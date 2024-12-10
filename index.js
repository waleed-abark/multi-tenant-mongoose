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
    this._models = new Map(); // Internal storage for models
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
      this._models = new Map(Object.entries(this.connection.models));
      this.connection.on("open", () =>
        console.log(`Connected to ${this.tenantURI}`)
      );
      this._id = this.connection?.db?.databaseName;
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
      this._models.clear();
      this.connection = null;
    } catch (error) {
      console.error("Error disconnecting from the database:", error);
      throw error; // Re-throw for test cases or external error handling
    }
  }

  /**
   * Getter for tenant ID
   * @returns {string|null}
   */
  get id() {
    return this._id;
  }

  /**
   * Getter for models
   * @returns {Map<string, mongoose.Model>}
   */
  get models() {
    return this._models;
  }
}

// CommonJS export
module.exports = Tenant;

// Optional ES Module export
module.exports.default = Tenant;
