import mongoose from 'mongoose';

import { DATA_BASE_NAME, MONGO_URL } from '@/config/environment';

export class MongoSetup {
  private database: typeof mongoose;

  constructor(mongooseInstance: typeof mongoose) {
    this.database = mongooseInstance;
  }

  static async connectDatabase() {
    try {
      const newDatabase = await mongoose.connect(MONGO_URL, { dbName: DATA_BASE_NAME });
      return new this(newDatabase);
    } catch (error) {
      throw new Error('Error conectando la base de datos');
    }
  }

  async disconnectDatabase() {
    try {
      await this.database.connection.close();
    } catch (error) {
      throw new Error('Error desconectando la base de datos');
    }
  }
}
