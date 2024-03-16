import express from 'express';
import UniversityController from './university.controller.js';

const router = express.Router(); // access to express router.

router.route('/universities').get(UniversityController.apiGetUniversities);
export default router;
