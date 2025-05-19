const TAG = {
  NAME: "tag",
  COLUMNS: {
    TAG_ID: "tag_id",
    FULL_NAME: "full_name"
  }
};

const MODULE = {
  NAME: "module",
  COLUMNS: {
    MODULE_ID: "module_id",
    TITLE: "title",
    DESCRIPTION: "description",
    EXPECTED_TIME: "expected_time",
    CONTENT_TYPE: "content_type",
    VIDEO_URL: "video_url"
  }
};

const COURSE = {
  NAME: "course",
  COLUMNS: {
    COURSE_ID: "course_id",
    COURSE_NAME: "course_name",
    MODULES: "modules",
    EVALUATIONS: "evaluations",
    TITLE: "title",
    DESCRIPTION: "description",
    EXPECTED_TIME: "expected_time",
    CONTENT_TYPE: "content_type",
    VIDEO_URL: "video_url"
  }
};

const COURSE_SIGNUP = {
  NAME: "course_signup",
  COLUMNS: {
    COURSE_ID: "course_id",
    USER_ID: "user_id",
    CREATED_USER_ID: "created_user_id",
    CREATED_AT: "created_at"
  }
};

const COURSE_TAG_MAPPING = {
  NAME: "course_tag_mapping",
  COLUMNS: {
    COURSE_ID: "course_id",
    TAG_ID: "tag_id"
  }
};

const COURSE_ATTENDANCE = {
  NAME: "course_attendance",
  COLUMNS: {
    COURSE_ID: "course_id",
    USER_ID: "user_id",
    STARTED_AT: "started_at"
  }
};

const COURSE_USER_EVALUATION = {
  NAME: "course_user_evaluation",
  COLUMNS: {
    COURSE_ID: "course_id",
    USER_ID: "user_id",
    COMPLETED_AT: "completed_at",
    TOTAL_QUESTIONS: "total_questions",
    EVALUATION_SCORE: "evaluation_score",
    EVALUATIONS: "evaluations"
  }
};

const USER_MODULE_ANALYTICS = {
  NAME: "user_module_analytics",
  COLUMNS: {
    COURSE_ID: "course_id",
    MODULE_NUMBER: "module_number",
    USER_ID: "user_id",
    STATUS: "status"
  }
};

module.exports = {
  TAG,
  MODULE,
  COURSE,
  COURSE_SIGNUP,
  COURSE_ATTENDANCE,
  COURSE_TAG_MAPPING,
  COURSE_USER_EVALUATION,
  USER_MODULE_ANALYTICS
};
