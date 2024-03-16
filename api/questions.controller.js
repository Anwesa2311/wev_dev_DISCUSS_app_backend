import QuestionDAO from '../dao/questionDAO.js';

export default class QuestionsController {
  static async apiGetQuestions(req, res, next) {
    try {
      const response = await QuestionDAO.getQuestions(req.query);

      if (response.error) {
        throw response.error;
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async apiGetQuestionsById(req, res, next) {
    try {
      const response = await QuestionDAO.getQuestionById(req.params.id);

      if (response.error) {
        throw response.error;
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async apiPostQuestion(req, res, next) {
    try {
      const questResp = await QuestionDAO.addQuestion(req.body);
      const { error } = questResp;

      if (error) {
        res.status(500).json({ error: 'Unable to post a question.' });
      } else {
        res.status(200).json(questResp);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDeleteQuestionById(req, res, next) {
    try {
      const { userId } = req.body || {};
      const response = await QuestionDAO.deleteQuestion(req.params.id, userId);
      const { error } = response;

      if (error) {
        res.status(500).json({ error: 'Unable to delete the question.' });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async apiUpdateQuestionById(req, res, next) {
    try {
      const response = await QuestionDAO.updateQuestion(
        req.params.id,
        req.body
      );
      const { error } = response;

      if (error) {
        res.status(500).json({ error: 'Unable to update the question.' });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
