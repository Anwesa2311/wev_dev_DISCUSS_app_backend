import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let classCollection;

export default class UserDAO {
  static async injectDB(conn) {
    if (classCollection) return;

    try {
      classCollection = await conn
        .db(process.env.DISCUSS_DB_NS)
        .collection('users');
    } catch (error) {
      console.error(`Unable to connect to favorites DB: ${error}`);
    }
  }

  static async findExistingUser(data) {
    try {
      return await classCollection.findOne(data);
    } catch (error) {
      console.error(`Unable to register user details: ${error}`);
      return { error: e };
    }
  }

  static async adduser(data) {
    try {
      let res = { responsemessage: 'Data saved successfully' };

      const userDoc = {
        name: data.name,
        email: data.email,
        password: data.password,
        student: [],
        instructor: []
      };

      console.log(classCollection);

      return await classCollection.insertOne(userDoc);
    } catch (error) {
      console.error(`Unable to register user details: ${error}`);
      return { error: e };
    }
  }
}
