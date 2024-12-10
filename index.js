import mongoose from "mongoose";

class Tenant {
  /**
   * @param {string} tenantURI
   */
  constructor(tenantURI) {
    if (typeof tenantURI !== "string") {
      throw new Error("Tenant URI must be a string");
    }
    this.tenantURI = tenantURI;
    this.connection = null;
    this.model = null;
  }
  /**
   * @returns {Promise<void>}
   */
  connect() {
    return (async () => {
      try {
        if (this.connection) {
          throw new Error("Tenant connection already exists");
        }
        this.connection = await mongoose.createConnection(this.tenantURI);
        this.model = this.connection.model;
        this.connection.on("open", () =>
          console.log(`Connected to ${this.tenantURI}`)
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }
  /**
   * @returns {Promise<void>}
   */
  disconnect() {
    return (async () => {
      try {
        if (!this.connection) {
          throw new Error("Tenant connection does not exist");
        }
        await this.connection.close();
        console.log(`Disconnected from ${this.tenantURI}`);
      } catch (error) {
        console.log(error);
      }
    })();
  }
}

exports.Tenant = Tenant;
