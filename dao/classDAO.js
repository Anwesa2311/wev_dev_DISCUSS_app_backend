import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;
import crypto from 'crypto';

let classCollection;
let userCollection;

export default class ClassDAO {
  static async injectDB(conn) {
    if (classCollection) return;

    try {
      classCollection = await conn
        .db(process.env.DISCUSS_DB_NS)
        .collection('classes');
      if (userCollection) return;
      userCollection = await conn
        .db(process.env.DISCUSS_DB_NS)
        .collection('users');
    } catch (error) {
      console.error(`Unable to connect to favorites DB: ${error}`);
    }
  }

  static async getClass(id) {
    try {
      // TODO: Call user signup on user
      let classObj = await classCollection.findOne({
        _id: ObjectId(id)
      });
      if (classObj === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      let users = await this.dbgetUser(classObj.instructor);
      classObj['instructorEmails'] = users.map((x) => x.email);
      return classObj;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async addclass(data) {
    try {
      // TODO: Call user signup on user
      if (
        (await classCollection.countDocuments({
          course_number: data.cNumber,
          semester: data.term,
          section: data.cSection,
          university: data.university
        })) > 0
      ) {
        return { errorId: 'logic', error: 'Class already exists.' };
      }
      data.instructors.push(data.user.email);
      let users = await this.getUsers(data.instructors);
      let ownerId = users.filter((x) => x.email === data.user.email)[0]._id;
      const instructorIds = users.map((x) => x._id);
      let hash = crypto.randomBytes(5).toString('hex');
      let classInfo = {
        course_number: data.cNumber,
        semester: data.term,
        section: data.cSection,
        description: data.cDescription,
        password: hash,
        instructor: instructorIds,
        student: [],
        owner: ownerId,
        university: data.university
      };
      const { insertedId } = await classCollection.insertOne(classInfo);
      await Promise.all(
        instructorIds.map(async (element) => {
          await this.addRolesUsers(element, insertedId, null);
        })
      );
      //TODO: email all instructors
      return insertedId;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async editclass(data) {
    try {
      // TODO: Call user signup on user
      let conflictClass = await classCollection.findOne({
        course_number: data.cNumber,
        semester: data.term,
        section: data.cSection,
        university: data.university
      });
      if (
        conflictClass !== null &&
        !conflictClass._id.equals(ObjectId(data.id))
      ) {
        return { errorId: 'logic', error: 'Class already exists.' };
      }
      let classOld = await classCollection.findOne({
        _id: ObjectId(data.id)
      });
      if (classOld === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      let ownerIds = (await this.getUsers([data.user.email])).map((x) => x._id);
      if (ownerIds.length <= 0 || !ownerIds[0].equals(classOld.owner)) {
        return { errorId: 'logic', error: 'Not the owner of the class.' };
      }
      let instructorIds = (await this.getUsers(data.instructors)).map(
        (x) => x._id
      );
      const addedInstructors = instructorIds.filter(
        (x) => !classOld.instructor.some((a) => a.equals(x))
      );
      const deletedInstructors = classOld.instructor.filter(
        (x) =>
          !instructorIds.some((a) => a.equals(x)) && !x.equals(classOld.owner)
      );
      instructorIds.push(classOld.owner);
      instructorIds = instructorIds.filter(this.onlyUnique);
      const resp = await classCollection.updateOne(
        { _id: ObjectId(data.id) },
        {
          $set: {
            course_number: data.cNumber,
            semester: data.term,
            section: data.cSection,
            description: data.cDescription,
            university: data.university,
            instructor: instructorIds
          }
        },
        { upsert: true }
      );
      await Promise.all(
        addedInstructors.map(async (element) => {
          await this.addRolesUsers(element, ObjectId(data.id), null);
        })
      );
      await Promise.all(
        deletedInstructors.map(async (element) => {
          await this.deleteRolesUsers(element, ObjectId(data.id), null);
        })
      );
      //TODO: email all added instructors
      return resp.modifiedCount === 1;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async addInstructorsToClass(data) {
    try {
      // TODO: Call user signup on user
      let classInfo = await classCollection.find({
        course_number: data.cNumber,
        semester: data.term,
        section: data.cSection,
        university: data.university
      });
      if (classInfo === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      return await this.addInstructorsToClassInternal(
        data.user.email,
        classInfo,
        data.instructors
      );
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async addInstructorsToClassById(data) {
    try {
      // TODO: Call user signup on user
      let classInfo = await classCollection.findOne({ _id: ObjectId(data.id) });
      if (classInfo === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      return await this.addInstructorsToClassInternal(
        data.user.email,
        classInfo,
        data.instructors
      );
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async addInstructorsToClassInternal(email, classInfo, instructors) {
    try {
      let ownerIds = (await this.getUsers([email])).map((x) => x._id);
      if (ownerIds.length <= 0 || !ownerIds[0].equals(classInfo.owner)) {
        return { errorId: 'logic', error: 'Not the owner of the class.' };
      }
      let instructorIds = (await this.getUsers(instructors)).map((x) => x._id);
      Array.prototype.push.apply(classInfo.instructor, instructorIds);
      classInfo.instructor = classInfo.instructor.filter(this.onlyUnique);
      const resp = await classCollection.updateOne(
        { _id: classInfo._id },
        {
          $set: {
            instructor: classInfo.instructor
          }
        },
        { upsert: true }
      );
      await Promise.all(
        instructorIds.map(async (element) => {
          await this.addRolesUsers(element, classInfo._id, null);
        })
      );
      return resp.modifiedCount === 1;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async joinclass(data) {
    try {
      // TODO: Call user signup on user
      let classInfo = await classCollection.findOne({
        course_number: data.cNumber,
        semester: data.term,
        section: data.cSection,
        university: data.university
      });
      if (classInfo === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      // if (classInfo.password !== data.password) {
      //   return { errorId: 'logic', error: 'Wrong password.' };
      // }
      let students = [];
      students.push(data.user.email);
      let studentId = (await this.getUsers(students)).map((x) => x._id)[0];
      classInfo.student.push(studentId);
      classInfo.student = classInfo.student.filter(this.onlyUnique);
      const resp = await classCollection.updateOne(
        { _id: classInfo._id },
        {
          $set: {
            student: classInfo.student
          }
        },
        { upsert: true }
      );
      await this.addRolesUsers(studentId, null, classInfo._id);
      return classInfo._id;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async leaveclass(data) {
    try {
      // TODO: Call user signup on user
      let classInfo = await classCollection.findOne({
        course_number: data.cNumber,
        semester: data.term,
        section: data.cSection,
        university: data.university
      });
      if (classInfo === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      return await this.leaveclassinternal(classInfo, data.user.email);
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async leaveclassbyid(data) {
    try {
      // TODO: Call user signup on user
      let classInfo = await classCollection.findOne({
        _id: ObjectId(data.id)
      });
      if (classInfo === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      return await this.leaveclassinternal(classInfo, data.user.email);
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async leaveclassinternal(classInfo, email) {
    try {
      let studentId = (await this.getUsers([email])).map((x) => x._id)[0];
      classInfo.student = classInfo.student.filter((x) => x.equals(studentId));
      classInfo.instructor = classInfo.instructor.filter((x) =>
        x.equals(studentId)
      );
      const resp = await classCollection.updateOne(
        { _id: classInfo._id },
        {
          $set: {
            student: classInfo.student,
            instructor: classInfo.instructor
          }
        },
        { upsert: true }
      );
      await this.deleteRolesUsers(studentId, classInfo._id, classInfo._id);
      return resp.modifiedCount === 1;
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async deleteclass(data) {
    try {
      // TODO: Call user signup on user
      let classObj = await classCollection.findOne({
        course_number: data.cNumber,
        semester: data.term,
        section: data.cSection,
        university: data.university
      });
      if (classObj === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      return await this.deleteclassInternal(classObj, data.user.email);
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async deleteclassId(data) {
    try {
      // TODO: Call user signup on user
      let classObj = await classCollection.findOne({
        _id: ObjectId(data.id)
      });
      if (classObj === null) {
        return { errorId: 'logic', error: 'Class does not exists.' };
      }
      return await this.deleteclassInternal(classObj, data.user.email);
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async deleteclassInternal(classInfo, email) {
    try {
      let students = [];
      students.push(email);
      let studentId = (await this.getUsers(students)).map((x) => x._id)[0];
      if (!studentId.equals(classInfo.owner)) {
        return { errorId: 'logic', error: 'Not the owner of the class.' };
      }
      await this.deleteRolesUsersForClass(classInfo._id);
      return await classCollection.deleteOne({ _id: classInfo._id });
    } catch (error) {
      console.error(`Unable to post a class: ${error}`);
      return { errorId: 'error', error: e };
    }
  }

  static async getUsers(instructors) {
    try {
      let objarray = [];
      instructors.forEach((element) => {
        objarray.push(element);
      });
      return await userCollection
        .find({
          email: { $in: objarray }
        })
        .toArray();
    } catch (error) {
      console.error(`There was some error, ${error}`);
      return [];
    }
  }

  static async deleteRolesUsersForClass(classId) {
    let users = await userCollection
      .find({
        $or: [
          { student: { $elemMatch: { $eq: classId } } },
          { instructor: { $elemMatch: { $eq: classId } } }
        ]
      })
      .toArray();
    if (users.length <= 0) {
      return;
    }
    await Promise.all(
      users.map(async (element) => {
        element.instructor = element.instructor.filter(
          (x) => !x.equals(classId)
        );
        element.student = element.student.filter((x) => !x.equals(classId));
        await this.dbUpdateUserRoles(
          element._id,
          element.student,
          element.instructor
        );
      })
    );
  }

  static async addRolesUsers(user, instructor, student) {
    try {
      let userInfo = await userCollection.findOne({
        _id: user
      });
      if (userInfo === null) {
        return { errorId: 'logic', error: 'User does not exists.' };
      }
      if (student !== null) {
        userInfo.student.push(student);
        userInfo.student = userInfo.student.filter(this.onlyUnique);
      }
      if (instructor !== null) {
        userInfo.instructor.push(instructor);
        userInfo.instructor = userInfo.instructor.filter(this.onlyUnique);
      }
      await this.dbUpdateUserRoles(
        userInfo._id,
        userInfo.student,
        userInfo.instructor
      );
    } catch (error) {
      console.error(`There was some error, ${error}`);
      return [];
    }
  }

  static async deleteRolesUsers(user, instructor, student) {
    try {
      let userInfo = await userCollection.findOne({
        _id: user
      });
      if (userInfo === null) {
        return { errorId: 'logic', error: 'User does not exists.' };
      }
      if (student !== null) {
        userInfo.student = userInfo.student.filter((x) => !x.equals(student));
      }
      if (instructor !== null) {
        userInfo.instructor = userInfo.instructor.filter(
          (x) => !x.equals(instructor)
        );
      }
      await this.dbUpdateUserRoles(
        userInfo._id,
        userInfo.student,
        userInfo.instructor
      );
    } catch (error) {
      console.error(`There was some error, ${error}`);
      return [];
    }
  }

  static async dbUpdateUserRoles(id, student, instructor) {
    const updateResponse = await userCollection.updateOne(
      { _id: id },
      {
        $set: {
          student: student,
          instructor: instructor
        }
      },
      { upsert: true }
    );
    return updateResponse;
  }

  static async dbgetUser(idList) {
    let objarray = [];
    idList.forEach((element) => {
      objarray.push(ObjectId(element));
    });
    return await userCollection
      .find({
        _id: { $in: objarray }
      })
      .toArray();
  }

  static async getClassesById(idList) {
    try {
      let objarray = [];
      idList.forEach((element) => {
        objarray.push(ObjectId(element));
      });
      let retList = await classCollection
        .find({
          _id: { $in: objarray }
        })
        .toArray();
      let a = {};

      retList.forEach((x) => {
        a[x._id] =
          x.university +
          ' ' +
          x.course_number +
          ' ' +
          x.semester +
          ' ' +
          x.section;
      });
      return a;
    } catch (error) {
      console.error(`There was some error, ${error}`);
      return [];
    }
  }

  static onlyUnique(value, index, self) {
    return self.findIndex((x) => x.equals(value)) === index;
  }

  static sendEmail() {
    return;
  }
}
