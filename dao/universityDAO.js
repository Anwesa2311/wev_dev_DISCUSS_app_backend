import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let universityCollection;

export default class UniversityDAO {
  static async injectDB(conn) {
    if (universityCollection) return;

    try {
      universityCollection = await conn
        .db(process.env.DISCUSS_DB_NS)
        .collection('universities');
    } catch (error) {
      console.error(`Unable to connect to favorites DB: ${error}`);
    }
  }

  static async get() {
    try {
      let universities = (await universityCollection.find().toArray()).map(
        (x) => x.name
      );
      return universities;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { error: e };
    }
  }
}
