import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let classCollection;

export default class CommentDAO {
  static async injectDB(conn) {
    if (classCollection) return;

    try {
      classCollection = await conn
        .db(process.env.DISCUSS_DB_NS)
        .collection("comments");
    } catch (error) {
      console.error(`Unable to connect to discuss DB: ${error}`);
    }
  }


  

  static async postComment(data) {
    try {

      //let res = {responsemessage:"Data saved successfully"};

      var data2 = {
        //_id:ObjectId(data._id),
        questionID:ObjectId(data.questionID),
        commentDesc:data.commentDesc,
        parentID:data.parentID?ObjectId(data.parentID):null,
        userID:ObjectId(data.userID),
        userName:data.userName,
        createdAt:data.createdAt
      }

      return await classCollection.insertOne(data2);
    } catch (error) {
      console.error(`Unable to register user details: ${error}`);
      return { error: error };
    }
  }

  static async getComment(questionID) {
    try {

      let res = {responsemessage:"Data saved successfully"};

      

      var comments= classCollection.find({questionID:ObjectId(questionID)});
      comments = comments.toArray();
      return comments;
    } catch (error) {
      console.error(`Unable to register user details: ${error}`);
      return { error: error };
    }
  }

  static async updateComment(commentID,text) {
    try {

      return await classCollection.updateOne({"_id":ObjectId(commentID)},{$set:{"commentDesc":text}});
      //comments = comments.toArray();
      //return comments;
    } catch (error) {
      console.error(`Unable to register user details: ${error}`);
      return { error: error };
    }
  }


  static async deleteComment(commentID,userId) {
    try{
                
        //{name: "Annu"}, {$set:{age:25}}

        return await classCollection.deleteOne({"_id":ObjectId(commentID),"userID":ObjectId(userId)});
    }

catch(e) {
    console.error(`Unable to delete review: ${e}`)
    return {error: e};
}
  }

  
}
