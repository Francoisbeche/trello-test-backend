import mongoose from 'mongoose';
mongoose.plugin(require('mongoose-regex-search'));

export default class Mongoose {
  constructor(addr, db) {
    this.mongooseConnection = null;
    this.error = null;

    this.addr = addr;
    this.db = db;
  }

  async createConnection() {
    try {
      this.mongooseConnection = await mongoose.connect(
        `mongodb://${this.addr}/${this.db}`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        }
      );
    } catch (err) {
      this.error = err;
    }
  }
}
