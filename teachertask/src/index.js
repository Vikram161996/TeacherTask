const express = require("express");
const teachers = require("./models/TeacherData");
const app = express();
const ifEquality = require("./views/helpers/ifEquality");
var tid;
const bodyparser = require("body-parser");
const {
  studentsRouter,
  getAllTeachers,
  getTeacherById,
  getAllStudents,
  getStudentsById,
  getAll
} = require("./routes/StudentsRouter");
//const studentsRouter = require("./routes/StudentsRouter");
const expressHbs = require("express-handlebars");
const path = require("path");

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality
  }
});

// Let express know to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());
app.get("/", (request, response) => {
  response.status(200).render("home", {
    layout: "hero",
    title: "Home"
  });
});

app.get("/teachers", (req, res) => {
  res.status(200).render("teachers", {
    layout: "navigation",
    title: "Teacher Details",
    data: getAllTeachers()
  });
});

app.get("/add-teacher", (req, res) => {
  res.status(200).render("addteacher", {
    layout: "navigation",
    title: "Add teacher",
    action: "/teachers",
    method: "POST"
  });
});

/*app.get("/add-student", (req, res) => {
  res.status(200).render("addstudent", {
    layout: "navigation",
    title: "Add student",
    action: "/:id/students",
    method: "POST"
  });
});*/

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  //console.log("kdsksjdksj");
  const requiredTeacher = getTeacherById(parseInt(id));
  console.log(requiredTeacher.id);
  tid = requiredTeacher;
  const h = requiredTeacher;
  res.status(200).render("students", {
    layout: "navigation",

    title: "Student Details",
    data: getAllStudents(requiredTeacher.id)
    //data: getAllStudents()
    //students: requiredTeacher.students
    // console.log(requiredTeacher.students)
  });
});

app.get("/edit-teacher/:id", (req, res) => {
  const { id } = req.params;
  const requiredTeacher = getTeacherById(parseInt(id));
  if (requiredTeacher) {
    res.status(200).render("addteacher.hbs", {
      layout: "navigation",
      title: "Add Teacher",
      teacher: requiredTeacher,
      action: "/teachers/" + requiredTeacher.id,
      method: "PUT"
    });
  } else {
    res.status(404).send("Student not found");
  }
});

app.get("/edit-student/:id", (req, res) => {
  const { id } = req.params;
  console.log("test");
  //const requiredStudent = getStudentsById(parseInt(id));
  //const requiredTeacher = getTeacherById(parseInt(id));
  const requiredStudent = getAll(parseInt(id));
  console.log(requiredStudent);
  //const requiredspecific = getStudentsById(parseInt(id));
  //console.log(requiredspecific);
  //console.log(getStudentsById(1));
  if (requiredStudent) {
    console.log("test tedt");
    console.log(requiredStudent);
    res.status(200).render("addstudent.hbs", {
      layout: "navigation",
      title: "Add Student",
      student: requiredStudent,
      // action: "/students/" + requiredStudent.id,
      action: "/teachers/students/" + requiredStudent.id,
      method: "PUT"
    });
  } else {
    res.status(404).send("Student not found");
  }
});

app.use("/teachers", studentsRouter);
//app.use("/students", studentsRouter);

app.get("*", (request, response) => {
  response.status(404).send("Page not found");
});

console.log("tidtid " + tid);
app.listen(8080, () => {
  console.log("Server running");
});
