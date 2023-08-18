import { MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): any {
    const collection = this.client.db().collection(name);
    return collection;
  },
};