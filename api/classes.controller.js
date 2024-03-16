import classDAO from '../dao/classDAO.js';

export default class ClassesController {
  static async apiPostClass(req, res, next) {
    try {
      if (
        req.body === {} ||
        ClassesController.validateClassCreation(req.body)
      ) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.addclass(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(201).json({ id: classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetClass(req, res, next) {
    try {
      if (!('id' in req.params) || req.params.id.length != 24) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.getClass(req.params.id);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(200).json({ classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetClassByIds(req, res, next) {
    try {
      const classResp = await classDAO.getClassesById(req.query.ids);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(200).json({ classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiUpdateClass(req, res, next) {
    try {
      if (
        req.body === {} ||
        ClassesController.validateClassUpdation(req.body)
      ) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.editclass(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(201).json({ id: classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiJoinClass(req, res, next) {
    try {
      if (req.body === {} || ClassesController.validateClassJoining(req.body)) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.joinclass(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(201).json({ id: classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiLeaveClass(req, res, next) {
    try {
      if (req.body === {} || ClassesController.validateClassLeave(req.body)) {
        if ('id' in req.body) {
          return await ClassesController.apiLeaveClassById(req, res, next);
        }
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.leaveclass(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(201).json({ id: classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiLeaveClassById(req, res, next) {
    try {
      if (
        req.body === {} ||
        req.body.user === undefined ||
        req.body.user.email === undefined ||
        req.body.user.email.trim() === '' ||
        req.body.user.name === undefined ||
        req.body.user.name.trim() === '' ||
        req.body.id === undefined ||
        req.body.id.trim() === '' ||
        req.body.id.length != 24
      ) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.leaveclassbyid(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId === 'error') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(201).json({ id: classResp });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDeleteClass(req, res, next) {
    try {
      if (
        req.body === {} ||
        ClassesController.validateClassDeletion(req.body)
      ) {
        if ('id' in req.body) {
          return await ClassesController.apiDeleteClassById(req, res, next);
        }
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.deleteclass(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId !== 'logic') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(200).json({ id: classResp, deleted: true });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDeleteClassById(req, res, next) {
    try {
      if (
        req.body === {} ||
        req.body.user === undefined ||
        req.body.user.email === undefined ||
        req.body.user.email.trim() === '' ||
        req.body.user.name === undefined ||
        req.body.user.name.trim() === '' ||
        req.body.id === undefined ||
        req.body.id.trim() === '' ||
        req.body.id.length != 24
      ) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.deleteclassId(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId !== 'logic') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(200).json({ id: classResp, deleted: true });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiAddInstructorsClass(req, res, next) {
    try {
      if (
        req.body === {} ||
        ClassesController.validateAddInstructors(req.body)
      ) {
        res.status(400).json({ error: 'Bad request.' });
        return;
      }
      const classResp = await classDAO.addInstructorsToClass(req.body);
      const { error, errorId } = classResp;
      console.log(error);
      if (error) {
        if (errorId !== 'logic') {
          res.status(500).json({ error: 'Unable to post a class.' });
        } else {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(200).json({ id: classResp, deleted: true });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static validateClassCreation(data) {
    return (
      data.user === undefined ||
      data.user.email === undefined ||
      data.user.email.trim() === '' ||
      data.user.name === undefined ||
      data.user.name.trim() === '' ||
      data.cDescription === undefined ||
      data.cNumber === undefined ||
      data.cNumber.trim() === '' ||
      data.cSection === undefined ||
      data.cSection.trim() === '' ||
      data.term === undefined ||
      data.term.trim() === '' ||
      data.university === undefined ||
      data.university.trim() === ''
    );
  }

  static validateClassUpdation(data) {
    return (
      data.id === undefined ||
      data.id.trim() === '' ||
      data.id.length != 24 ||
      data.user === undefined ||
      data.user.email === undefined ||
      data.user.email.trim() === '' ||
      data.user.name === undefined ||
      data.user.name.trim() === '' ||
      data.cDescription === undefined ||
      data.cNumber === undefined ||
      data.cNumber.trim() === '' ||
      data.cSection === undefined ||
      data.cSection.trim() === '' ||
      data.term === undefined ||
      data.term.trim() === '' ||
      data.university === undefined ||
      data.university.trim() === ''
    );
  }

  static validateClassJoining(data) {
    return (
      data.user === undefined ||
      data.user.email === undefined ||
      data.user.email.trim() === '' ||
      data.user.name === undefined ||
      data.user.name.trim() === '' ||
      data.cNumber === undefined ||
      data.cNumber.trim() === '' ||
      data.cSection === undefined ||
      data.cSection.trim() === '' ||
      data.term === undefined ||
      data.term.trim() === '' ||
      data.university === undefined ||
      data.university.trim() === ''
      // ||
      // data.password === undefined ||
      // data.password.trim() === ''
    );
  }

  static validateClassLeave(data) {
    return (
      data.user === undefined ||
      data.user.email === undefined ||
      data.user.email.trim() === '' ||
      data.user.name === undefined ||
      data.user.name.trim() === '' ||
      data.cNumber === undefined ||
      data.cNumber.trim() === '' ||
      data.cSection === undefined ||
      data.cSection.trim() === '' ||
      data.term === undefined ||
      data.term.trim() === '' ||
      data.university === undefined ||
      data.university.trim() === ''
    );
  }

  static validateClassDeletion(data) {
    return (
      data.user === undefined ||
      data.user.email === undefined ||
      data.user.email.trim() === '' ||
      data.user.name === undefined ||
      data.user.name.trim() === '' ||
      data.cNumber === undefined ||
      data.cNumber.trim() === '' ||
      data.cSection === undefined ||
      data.cSection.trim() === '' ||
      data.term === undefined ||
      data.term.trim() === '' ||
      data.university === undefined ||
      data.university.trim() === ''
    );
  }

  static validateAddInstructors(data) {
    return (
      data.user === undefined ||
      data.user.email === undefined ||
      data.user.email.trim() === '' ||
      data.user.name === undefined ||
      data.user.name.trim() === '' ||
      data.cNumber === undefined ||
      data.cNumber.trim() === '' ||
      data.cSection === undefined ||
      data.cSection.trim() === '' ||
      data.term === undefined ||
      data.term.trim() === '' ||
      data.university === undefined ||
      data.university.trim() === '' ||
      data.instructors === undefined ||
      !Array.isArray(data.instructors) ||
      data.instructors.length === 0
    );
  }
}
