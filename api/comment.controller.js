import CommentDao from "../dao/commentDAO.js";

export default class UserController {
  static async apiPostComment(req, res, next) {
    try {
 
    const _id = req.body._id;
    const questionID = req.body.questionId;
    const commentDesc = req.body.commentDesc;
    const parentID = req.body.parentID;
    const userID = req.body.userID;
    const userName = req.body.userName;
    const createdAt = req.body.createdAt;

      var data=
      {
        questionID:questionID,
        commentDesc:commentDesc,
        parentID:parentID,
        userID:userID,
        userName:userName,
        createdAt:createdAt
      }

      const commentResp = await CommentDao.postComment(data);

      const { error } = commentResp;
      console.log(error);
      if (error) {
        res.status(500).json({ error: 'Invalid comment data' });
      } else {
        res.status(200).json(commentResp);
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
}
  
static async apiGetCommentByQuestionID(req, res, next) {
    try {
 
    const questionID = req.params.questionId;
   



      const commentResp = await CommentDao.getComment(questionID);

      const { error } = commentResp;
      console.log(error);
      if (error) {
        res.status(500).json({ error: 'Invalid comment data' });
      } else {
        res.status(200).json(commentResp);
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
}


static async apiUpdateComment(req, res, next) {
    try {
 
    const id = req.body._id;
    const text = req.body.text;

      const commentResp = await CommentDao.updateComment(id,text);

      const { error } = commentResp;
      console.log(error);
      if (error) {
        res.status(500).json({ error: 'Invalid comment data' });
      } else {
        res.status(200).json(commentResp);
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
}



static async apiDeleteComment(req, res, next) {
    try {
 
        const commentId = req.body._id;
        const userId = req.body.user_id;

      const commentResp = await CommentDao.deleteComment(commentId,userId);

      const { error } = commentResp;
      console.log(error);
      if (error) {
        res.status(500).json({ error: 'Invalid comment data' });
      } else {
        res.status(200).json(commentResp);
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
}



}
