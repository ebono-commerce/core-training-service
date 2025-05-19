const { logQuery } = require("../../commons/helpers");
const {
  USER_MODULE_ANALYTICS,
  COURSE_SIGNUP,
  COURSE_ATTENDANCE,
  COURSE_USER_EVALUATION,
  COURSE
} = require("../commons/model");

function getUserCourseAnalyticsRepo(fastify) {
  async function getUserCourseAnalytics({ data, logTrace }) {
    const { course_id, user_id } = data;
    const knex = this;

    const tagsSubQuery = `
            select jsonb_agg(t.*) as tags
            from
            course_tag_mapping as ctm 
            left join 
            tag t
            on ctm.tag_id = t.tag_id
            where ctm.course_id = c.course_id
        `;

    const subQueryForUserEvalution = `(SELECT coalesce(json_agg(UE.*), '[]'::json) FROM ${COURSE_USER_EVALUATION.NAME} AS UE WHERE UE.course_id= '${course_id}' and UE.user_id = '${user_id}') as user_evaluation`;

    const query = knex
      .select([
        "c.*",
        knex.raw(`(${tagsSubQuery}) as tags`),
        knex.raw(subQueryForUserEvalution)
      ])
      .from(`${COURSE.NAME} as c`)
      .where(COURSE.COLUMNS.COURSE_ID, course_id);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course user analytics",
      logTrace
    });

    const response = await query;
    return response[0];
  }

  async function fetchCourseUserAnalytics({ input, logTrace }) {
    const { course_id, user_id, completed_at_from, completed_at_to } = input;

    const knex = this;

    let query = knex
      .select([
        `CS.${COURSE_SIGNUP.COLUMNS.COURSE_ID}`,
        `CS.${COURSE_SIGNUP.COLUMNS.USER_ID}`,
        `C.${COURSE.COLUMNS.COURSE_NAME}`,
        `CA.${COURSE_ATTENDANCE.COLUMNS.STARTED_AT}`,
        `CUE.${COURSE_USER_EVALUATION.COLUMNS.COMPLETED_AT}`,
        `CUE.${COURSE_USER_EVALUATION.COLUMNS.EVALUATION_SCORE}`,
        `CUE.${COURSE_USER_EVALUATION.COLUMNS.TOTAL_QUESTIONS}`
      ])
      .from(`${COURSE_SIGNUP.NAME} as CS`)
      .leftJoin(
        `${COURSE.NAME} as C`,
        `CS.${COURSE_SIGNUP.COLUMNS.COURSE_ID}`,
        `C.${COURSE.COLUMNS.COURSE_ID}`
      )
      .leftJoin(`${COURSE_ATTENDANCE.NAME} as CA`, function () {
        this.on(
          `CS.${COURSE_SIGNUP.COLUMNS.COURSE_ID}`,
          "=",
          `CA.${COURSE_ATTENDANCE.COLUMNS.COURSE_ID}`
        );
        this.andOn(
          `CS.${COURSE_SIGNUP.COLUMNS.USER_ID}`,
          "=",
          `CA.${COURSE_ATTENDANCE.COLUMNS.USER_ID}`
        );
      })
      .leftJoin(`${COURSE_USER_EVALUATION.NAME} as CUE`, function () {
        this.on(
          `CS.${COURSE_SIGNUP.COLUMNS.COURSE_ID}`,
          "=",
          `CUE.${COURSE_USER_EVALUATION.COLUMNS.COURSE_ID}`
        );
        this.andOn(
          `CS.${COURSE_SIGNUP.COLUMNS.USER_ID}`,
          "=",
          `CUE.${COURSE_USER_EVALUATION.COLUMNS.USER_ID}`
        );
      });

    if (course_id) {
      query = query.where(`CS.${COURSE_SIGNUP.COLUMNS.COURSE_ID}`, course_id);
    }

    if (user_id) {
      query = query.where(`CS.${COURSE_SIGNUP.COLUMNS.USER_ID}`, user_id);
    }

    if (completed_at_from) {
      query = query.where(
        `CUE.${COURSE_USER_EVALUATION.COLUMNS.COMPLETED_AT}`,
        ">=",
        completed_at_from
      );
    }

    if (completed_at_to) {
      query = query.where(
        `CUE.${COURSE_USER_EVALUATION.COLUMNS.COMPLETED_AT}`,
        "<",
        completed_at_to
      );
    }

    logQuery({
      logger: fastify.log,
      query,
      context: "Course user analytics Fetch",
      logTrace
    });

    const response = await query;
    return response;
  }

  async function getUserModuleAnalytics({ data, logTrace }) {
    const { course_id, user_id } = data;
    const knex = this;

    const query = knex
      .select("*")
      .from(USER_MODULE_ANALYTICS.NAME)
      .where(USER_MODULE_ANALYTICS.COLUMNS.COURSE_ID, course_id)
      .andWhere(USER_MODULE_ANALYTICS.COLUMNS.USER_ID, user_id);

    logQuery({
      logger: fastify.log,
      query,
      context: "User Module analytics",
      logTrace
    });

    const response = await query;
    return response;
  }

  return {
    getUserCourseAnalytics,
    getUserModuleAnalytics,
    fetchCourseUserAnalytics
  };
}
module.exports = getUserCourseAnalyticsRepo;
