const express = require("express");
const teachers = require("../models/TeacherData");
var tid;
const studentsRouter = express.Router();
const getAllTeachers = () => teachers;
const getAllStudents = id => teachers[id - 1].students;
const gettotalstudents = () => {
  let count = 0;
  for (let i = 0; i < teachers.length; i++) {
    for (let j = 0; j < teachers[i].students.length; j++) {
      count++;
    }
  }
  //console.log(count);
  return count; //teachers.students;
};
gettotalstudents();

const getAll = id => {
  for (let i = 0; i < teachers.length; i++) {
    for (let j = 0; j < teachers[i].students.length; j++) {
      if (teachers[i].students[j].id === id) {
        return teachers[i].students[j];
      }
    }
  }
};
//const getAllStudents = () => teachers.students;
//console.log(getAllStudents(0));
//console.log(teachers.);

const isValidStudent = studentobject => {
  // validation as task
  return true;
};
const getTeacherById = id => {
  const teachers = getAllTeachers();
  return teachers.find(each => each.id === id);
};

const getStudentsById = id => {
  console.log("tr");
  const students = getAllStudents();
  console.log(students);
  return students.find(each => each.id === id);

  /*let a;
  let b;
  const teachers = getAllTeachers();
  const students = getAllStudents();
  //const a = teachers.find(item => item.students.id === id);
  //console.log(a);
  //const students = getAllStudents(a.id);
  return students.find(each => each.id === id);
  /*for (let i = 0; i < teachers.length; i++) {
    for (let j = 0; j < teachers[i].students.length; j++) {
      if (teachers[i].students[j].id === id) {
        a = i;
        b = j;
        break;
      }
    }
  }
  return getAllStudents(a);*/
};

//get teachers
studentsRouter
  .get("/", (req, res) => {
    res.status(200).json({
      data: getAllTeachers
    });
  })
  //post teachers
  .post("/", (req, res) => {
    const id = getAllTeachers().length + 1;
    if (req.body.firstName) {
      teachers.push({
        id,
        ...req.body
      });
      res.status(200).json({
        message: "Teacher added Successfully",
        data: req.body
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })

  //post students by id
  .post("teachers/:id", (req, res) => {
    const { id } = req.params.id;
    const teacherid = parseInt(id);
    const requiredTeacher = teachers.find(each => each.id === teacherid);
    console.log("post" + teacherid);
    const id1 = gettotalstudents + 1;

    console.log("tid" + tid);
    console.log("required" + requiredTeacher);
    if (req.body.name) {
      /*teachers.push({
        id1,
        ...req.body
      });*/
      requiredTeacher.students.push({
        id1,
        ...req.body
      });
      res.status(200).json({
        message: "Student added Successfully",
        data: req.body
      });
    } else {
      res.status(400).send("Invalid Student");
    }
  })

  /**
   * Individual student resource
   */

  //get teachers by id

  .get("/:id", (req, res) => {
    const { id } = req.params;
    console.log("kjsksdjd");
    const teacherid = parseInt(id);
    const requiredStudent = teachers.find(each => each.id === teacherid);
    if (requiredStudent) {
      res.status(200).json({ data: requiredStudent });
    } else {
      res.status(400).send("Teacher unavailable");
    }
  })

  //delete teachers by id
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const teacherid = parseInt(id);
    let requiredStudentIndex;
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].id === teacherid) {
        requiredStudentIndex = i;
        break;
      }
    }
    if (typeof requiredStudentIndex !== "undefined") {
      teachers.splice(requiredStudentIndex, 1);
      res.status(200).json({
        message: "Teacher has been deleted"
      });
    } else {
      res.status(400).send("Invalid teacher");
    }
  })

  //put teachers by id

  .put("/:id", (req, res) => {
    console.log("teacher put");
    const { id } = req.params;
    const teacherid = parseInt(id);
    let requiredStudentIndex;
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].id === teacherid) {
        requiredStudentIndex = i;
        break;
      }
    }
    if (
      typeof requiredStudentIndex !== "undefined" &&
      isValidStudent(req.body)
    ) {
      const originalStudent = teachers[requiredStudentIndex];
      const newteacher = {
        ...originalStudent,
        ...req.body
      };
      teachers.splice(requiredStudentIndex, 1, newteacher);
      res.status(200).json({
        message: "Teacher details updated!",
        data: newteacher
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })
  //get student by id
  .get("/students/:id", (req, res) => {
    const { id } = req.params;
    const studentid = parseInt(id);
    tid = studentid;
    console.log(studentid);
    let requiredStudent;
    var a = [];
    for (let i = 0; i < teachers.length; i++) {
      a.push(teachers[i].students);
    }
    let b;
    console.log(teachers[0].students);
    for (let i = 0; i < a.length; i++) {
      requiredStudent = a[i].find(each => each.id === studentid);
      if (requiredStudent) {
        break;
      }
    }
    //console.log(requiredStudent);
    if (requiredStudent) {
      res.status(200).json({ data: requiredStudent });
    } else {
      res.status(400).send("Student unavailable");
    }
  })

  //put student by id
  .put("/students/:id", (req, res) => {
    //alert("put");
    const { id } = req.params;
    console.log("put method");
    const studentid = parseInt(id);
    let requiredteacherIndex;
    let requiredStudentindex;
    for (let i = 0; i < teachers.length; i++) {
      for (let j = 0; j < teachers[i].students.length; j++) {
        if (teachers[i].students[j].id === studentid) {
          requiredteacherIndex = i;
          requiredStudentindex = j;

          //    console.log("jks");
          break;
        }
      }
    }
    //console.log(requiredteacherIndex);
    //console.log(requiredStudentindex);
    if (typeof requiredteacherIndex !== "undefined") {
      console.log("jks");
      const originalStudent =
        teachers[requiredteacherIndex].students[requiredStudentindex];
      const newteacher = {
        ...originalStudent,
        ...req.body
      };
      console.log(newteacher);
      /*teachers[requiredteacherIndex].students[requiredStudentindex].splice(
        requiredStudentindex,
        1
      );*/
      teachers[requiredteacherIndex].students.splice(
        requiredStudentindex,
        1,
        newteacher
      );
      console.log(newteacher);
      res.status(200).json({
        message: "Student details updated!",
        data: newteacher
      });
    } else {
      res.status(400).send("Invalid Student");
    }
  })

  //delete students by id
  .delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const studentid = parseInt(id);
    let requiredteacherIndex;
    let requiredStudentindex;
    for (let i = 0; i < teachers.length; i++) {
      for (let j = 0; j < teachers[i].students.length; j++) {
        if (teachers[i].students[j].id === studentid) {
          requiredteacherIndex = i;
          requiredStudentindex = j;

          console.log("jks");
          break;
        }
      }
    }
    console.log(teachers[requiredteacherIndex]);
    //console.log(requiredteacherIndex);
    //console.log(requiredStudentindex);
    console.log(teachers[requiredteacherIndex]);
    if (typeof requiredStudentindex !== "undefined") {
      teachers[requiredteacherIndex].students.splice(requiredStudentindex, 1);
      res.status(200).json({
        message: "Student has been deleted"
      });
    } else {
      res.status(400).send("Invalid student");
    }
  });

module.exports = {
  studentsRouter,
  getAllTeachers,
  getTeacherById,
  getAllStudents,
  getStudentsById,
  getAll
};
