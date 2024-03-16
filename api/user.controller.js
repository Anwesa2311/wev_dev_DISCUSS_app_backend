import UserDao from '../dao/userDao.js';

export default class UserController {
  static async apiPostUserInfo(req, res, next) {
    try {
      const existingUser = await UserDao.findExistingUser(req.body);

      if (existingUser) {
        res.status(201).json({ error: 'User data already exitsts' });
      } else {
        const userdata = await UserDao.adduser(req.body);
        let user;
        if (userdata) {
          user = await UserDao.findExistingUser(req.body);
        }
        const { error } = userdata;
        console.log(error);
        if (error) {
          res.status(500).json({ error: 'Unable to get user data.' });
        } else {
          res.status(201).json(user);
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiSignIn(req, res, next) {
    try {
      if (req.body === {}) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }

      const existingUser = await UserDao.findExistingUser(req.body);
      const { error } = existingUser;
      console.log(error);
      if (error) {
        res.status(500).json({ error: 'Invalid UserName/Password.' });
      } else {
        res.status(200).json(existingUser);
      }
    } catch (error) {
      res.status(500).json({ error: 'Invalid UserName/Password.' });
    }
  }
}
