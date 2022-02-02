const { MongoClient } = require('mongodb')
const { Guard } = require('../../../../core/Guard')

module.exports = class Mongo {
	#mongoClient;
  #uri;
  credentials;

  constructor(credentials) {
    this.credentials = credentials;

    (async () => {
      console.log('|------------------------------------------------------------------|');
      console.log(`| ${Mongo.name}                                                    |`);
      console.log('|------------------------------------------------------------------|');
      await this.init();
    })();
  }

  async init() {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: this.credentials.db, argumentName: 'db' },
      { argument: this.credentials.url, argumentName: 'url' },
      { argument: this.credentials.port, argumentName: 'port' },
      { argument: this.credentials.user, argumentName: 'user' },
      { argument: this.credentials.password, argumentName: 'password' },
    ]);

    if (!guardResult.succeeded) {
      
      return new Error('Some arguments are invalid');
    }

    this.uri = `mongodb+srv://${this.credentials.user}:${this.credentials.password}@${
      this.credentials.url
    }`;

    await this.openConnect();
  }

  async openConnect(){
    if (!this.mongoClient) {
      this.mongoClient = await MongoClient.connect(this.uri).then(
        (mongoClientConnection) => mongoClientConnection
      );
      return this.mongoClient;
    } else {
      return this.mongoClient;
    }
  }

  async isConnectionAlive(){
    try {
      const isAlive = !!this.mongoClient;
      if (!isAlive) {
        await this.openConnect();
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCollection(collection) {
    try {
      while (!(await this.isConnectionAlive())) {
        setTimeout(async () => {
          console.log('|------------------------------------------------------------------|');
          console.log('| isConnectionAlive                                                |');
          console.log('|------------------------------------------------------------------|');
          await this.isConnectionAlive();
        }, 1000);
      }

      return this.mongoClient.db(this.credentials.db).collection(collection);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async closeConnect(){
    try {
      if (this.mongoClient) {
        await this.mongoClient.close();
      }
    } catch (error) {
      throw new Error('Close connect error');
    }
  }
}