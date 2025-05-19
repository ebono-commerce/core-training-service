const createTag = require("./createTags");
const getTags = require("./getTags");

const createCourse = require("./createCourse");
const getCourse = require("./getCourse");

const postCourseModule = require("./postCourseModule");
const postCourseEvaluation = require("./postCourseEvaluation");
const postCourseSignup = require("./postCourseSignup");
const postCourseAttendance = require("./postCourseAttendance");
const putCourse = require("./putCourse");
const postModuleAnalytics = require("./postModuleAnalytics");
const postUserEvaluation = require("./postUserEvaluation");
const getUserCourseAnalytics = require("./getUserCourseAnalytics");
const postCourseAnalyticsFetch = require("./postCourseAnalyticsFetch");

module.exports = {
  createTag,
  getTags,
  createCourse,
  getCourse,
  postCourseModule,
  postCourseEvaluation,
  postCourseSignup,
  postCourseAttendance,
  putCourse,
  postModuleAnalytics,
  postUserEvaluation,
  getUserCourseAnalytics,
  postCourseAnalyticsFetch
};
