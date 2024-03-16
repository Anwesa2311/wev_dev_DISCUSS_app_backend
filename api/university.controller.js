import UniversityDAO from '../dao/universityDAO.js';

export default class UniversityController {
  static async apiGetUniversities(req, res, next) {
    try {
      const universities = await UniversityDAO.get();
      const { error } = universities;
      console.log(error);
      if (error) {
        res.status(500).json({ error: 'Unable to get universities.' });
      } else {
        res.status(201).json({ universities: universities });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
