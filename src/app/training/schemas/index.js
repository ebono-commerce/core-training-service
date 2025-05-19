const postAddTag = require("./addTag");
const getTags = require("./getTags");
const postAddCourse = require("./addCourse");
const putCourse = require("./putCourse");
const getCourse = require("./getCourse");
const postCourseModule = require("./postCourseModule");
const postCourseEvaluation = require("./postCourseEvaluation");
const postCourseSignup = require("./postCourseSignup");
const postCourseAttendance = require("./postCourseAttendance");
const postModuleAnalytics = require("./postModuleAnalytics");
const postUserEvaluation = require("./postUserEvaluation");
const getUserCourseAnalytics = require("./getUserCourseAnalytics");
const postCourseAnalyticsFetch = require("./postCourseAnalyticsFetch");

module.exports = {
  postAddTag,
  getTags,
  postAddCourse,
  putCourse,
  getCourse,
  postCourseModule,
  postCourseEvaluation,
  postCourseSignup,
  postCourseAttendance,
  postModuleAnalytics,
  postUserEvaluation,
  getUserCourseAnalytics,
  postCourseAnalyticsFetch
};
