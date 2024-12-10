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
    this._id = null;
    this.connection = null;
    this.models = new Map();
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
        this.models = this.connection.models;
        this.connection.on("open", () =>
          console.log(`Connected to ${this.tenantURI}`)
        );
        this._id = this.connection.db.databaseName;
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

  /**
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {Map<string, mongoose.Model>}
   */
  get models() {
    return this.models;
  }

  /**
   * @returns {Promise<object>}
   */
  get health() {
    return (async () => {
      const connection = await this.connection.db.command({ serverStatus: 1 });
      return connection;
    })();
  }
}

exports.Tenant = Tenant;

