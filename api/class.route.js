import express from 'express';
import ClassesController from './classes.controller.js';
import UserController from './user.controller.js';
import CommentController from './comment.controller.js';

const router = express.Router(); // access to express router.

router.route('/class/').get(ClassesController.apiGetClassByIds);
router.route('/class/:id').get(ClassesController.apiGetClass);
router.route('/class').post(ClassesController.apiPostClass);
router.route('/class').put(ClassesController.apiUpdateClass);
router.route('/class/join').post(ClassesController.apiJoinClass);
router.route('/class/leave').post(ClassesController.apiLeaveClass);
router.route('/class').delete(ClassesController.apiDeleteClass);
router
  .route('/class/instructor/add')
  .post(ClassesController.apiAddInstructorsClass);

router.route('/signup').post(UserController.apiPostUserInfo);
router.route('/signin').post(UserController.apiSignIn);

router.route('/comments').post(CommentController.apiPostComment);
router.route('/comments').put(CommentController.apiUpdateComment);
router.route('/comments/:questionId').get(CommentController.apiGetCommentByQuestionID);
router.route('/comments').delete(CommentController.apiDeleteComment);

export default router;
