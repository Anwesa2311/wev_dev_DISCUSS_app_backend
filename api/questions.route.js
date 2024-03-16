import express from 'express';

import QuestionsController from './questions.controller.js';

const router = express.Router(); // access to express router.

router.route('/').get(QuestionsController.apiGetQuestions);
router.route('/newPost').post(QuestionsController.apiPostQuestion);
router
  .route('/id/:id')
  .get(QuestionsController.apiGetQuestionsById)
  .delete(QuestionsController.apiDeleteQuestionById)
  .patch(QuestionsController.apiUpdateQuestionById);

export default router;
