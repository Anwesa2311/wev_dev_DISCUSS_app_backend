import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let collection;

export default class QuestionDAO {
  static async injectDB(conn) {
    if (collection) return;

    try {
      collection = await conn
        .db(process.env.DISCUSS_DB_NS)
        .collection('question');
    } catch (error) {
      console.error(`Unable to connect to the DB: ${error}`);
    }
  }

  static async getQuestions(params) {
    try {
      const query = {
        class_id: params.classroomId
      };

      if (params.search) {
        query.$text = {
          $search: params.search
        };
      }

      params.perPage = params.perPage || 30;
      params.page = params.page || 0;

      const cursor = await collection.aggregate([
        {
          $match: query
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'questionID',
            as: 'comments'
          }
        }
      ]);
      // .skip(params.perPage * params.page)
      // .limit(parseInt(params.perPage));

      const questions = await cursor.toArray();

      return questions.reverse();
    } catch (error) {
      console.error(`Unable to fetch questions: ${error}`);
      return { error };
    }
  }

  static async getQuestionById(id) {
    try {
      // TODO: Check if user is authorised
      return await collection
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id)
            }
          },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'questionID',
              as: 'comments'
            }
          }
        ])
        .next();
    } catch (error) {
      console.error(`Unable to fetch questions: ${error}`);
      return { error };
    }
  }

  static async addQuestion(data) {
    try {
      // TODO: Check classroom and if user is added in the class
      const question = {
        class_id: data.classroomId,
        title: data.title,
        description: data.description,
        is_question: data.is_question,
        author_id: data.userId
      };

      return await collection.insertOne(question);
    } catch (e) {
      console.error(`addQuestion(): Unable to execute db command. ${e}`);
      return { error: e };
    }
  }

  static async updateQuestion(id, data) {
    try {
      const { userId, classId, ...updatedQuestion } = data;
      return await collection.updateOne(
        {
          _id: ObjectId(id),
          author_id: userId
        },
        { $set: updatedQuestion }
      );
    } catch (e) {
      console.error(`updateQuestion(): Unable to execute db command. ${e}`);
      return { error: e };
    }
  }

  static async deleteQuestion(id, authorId) {
    try {
      return await collection.deleteOne({
        _id: ObjectId(id),
        author_id: authorId
      });
    } catch (e) {
      console.error(`deleteQuestion(): Unable to execute db command. ${e}`);
      return { error: e };
    }
  }
}
