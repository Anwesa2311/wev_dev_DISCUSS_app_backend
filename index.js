import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import ClassDAO from './dao/classDAO.js';
import UniversityDAO from './dao/universityDAO.js';
import QuestionDAO from './dao/questionDAO.js';
import UserDAO from './dao/userDao.js';
import CommentDAO from './dao/commentDAO.js';

async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.DISCUSS_DB_URI);
  const port = process.env.PORT || 8000;

  try {
    // Connect to MongoDB server
    await client.connect();
    await ClassDAO.injectDB(client);
    await UniversityDAO.injectDB(client);
    await QuestionDAO.injectDB(client);
    await UserDAO.injectDB(client);
    await CommentDAO.injectDB(client);

    app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
