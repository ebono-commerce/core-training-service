const { logQuery } = require("../../commons/helpers");
const {
  COURSE,
  COURSE_SIGNUP,
  COURSE_USER_EVALUATION
} = require("../commons/model");

function courseRepo(fastify) {
  async function createCourse({ data, logTrace }) {
    const knex = this;
    const query = knex(COURSE.NAME)
      .returning(COURSE.COLUMNS.COURSE_ID)
      .insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Create Course",
      logTrace
    });

    const response = await query;
    return response[0];
  }

  async function putCourse({ data, logTrace, course_id }) {
    const { audit, ...restProps } = data;
    const knex = this;
    const query = knex(COURSE.NAME)
      .returning(COURSE.COLUMNS.COURSE_ID)
      .update({
        ...restProps,
        ...(audit && {
          audit: knex.raw(`"audit" || '${JSON.stringify(audit)}'`)
        })
      })
      .where(COURSE.COLUMNS.COURSE_ID, course_id);

    logQuery({
      logger: fastify.log,
      query,
      context: "Create Course",
      logTrace
    });

    const response = await query;
    return { course_id: response[0] };
  }

  async function updateModule({ data, logTrace, course_id }) {
    const knex = this;
    const query = knex(COURSE.NAME)
      .returning(COURSE.COLUMNS.COURSE_ID)
      .update({
        [COURSE.COLUMNS.MODULES]: data
      })
      .where(COURSE.COLUMNS.COURSE_ID, course_id);
    logQuery({
      logger: fastify.log,
      query,
      context: "Update Module in course",
      logTrace
    });

    await query;
    return { success: true };
  }

  async function updateEvalution({ data, logTrace, course_id }) {
    const knex = this;
    const query = knex(COURSE.NAME)
      .returning(COURSE.COLUMNS.COURSE_ID)
      .update({
        [COURSE.COLUMNS.EVALUATIONS]: data
      })
      .where(COURSE.COLUMNS.COURSE_ID, course_id);
    logQuery({
      logger: fastify.log,
      query,
      context: "Update Evaluation in course",
      logTrace
    });

    await query;
    return { success: true };
  }

  async function getCourse({ logTrace, course_id, user_id, status }) {
    const knex = this;
    let query;

    const tagsSubQuery = `
            select jsonb_agg(t.*) as tags
            from
            course_tag_mapping as ctm 
            left join 
            tag t
            on ctm.tag_id = t.tag_id
            where ctm.course_id = c.course_id
        `;

    query = knex
      .select("*", knex.raw(`(${tagsSubQuery}) as tags`))
      .from(`${COURSE.NAME} as c`);

    if (course_id) {
      query = knex
        .select("*", knex.raw(`(${tagsSubQuery}) as tags`))
        .from(`${COURSE.NAME} as c`)
        .where(COURSE.COLUMNS.COURSE_ID, course_id);
    }

    if (user_id) {
      const sub_query = knex
        .select(COURSE_SIGNUP.COLUMNS.COURSE_ID)
        .from(COURSE_SIGNUP.NAME)
        .where(COURSE_SIGNUP.COLUMNS.USER_ID, user_id);

      const module_analytics_sub_query = `(
            SELECT
              json_build_object(
                  course_id,
                  json_object_agg(uma.module_number, uma.status)
              )
          FROM
              user_module_analytics as uma
          WHERE
              uma.user_id = '${user_id}'
          AND 
            uma.course_id = "c".course_id
          GROUP BY
              uma.course_id
      ) as user_module_analytics_statuses`;

      const subQueryForUserEvalution = `(SELECT coalesce(json_agg(UE.*), '[]'::json) FROM ${COURSE_USER_EVALUATION.NAME} AS UE WHERE UE.course_id= "c".course_id and UE.user_id = '${user_id}') as user_evaluation`;

      if (status === "ASSIGNED") {
        query = knex
          .select([
            "c.*",
            knex.raw(`(${tagsSubQuery}) as tags`),
            knex.raw(module_analytics_sub_query),
            knex.raw(subQueryForUserEvalution)
          ])
          .from(`${COURSE.NAME} as c`)
          .whereIn(COURSE.COLUMNS.COURSE_ID, sub_query);
      } else {
        query = knex
          .select([
            "c.*",
            knex.raw(`(${tagsSubQuery}) as tags`),
            knex.raw(subQueryForUserEvalution)
          ])
          .from(`${COURSE.NAME} as c`)
          .whereNotIn(COURSE.COLUMNS.COURSE_ID, sub_query);
      }
    }

    logQuery({
      logger: fastify.log,
      query,
      context: "Get Course",
      logTrace
    });

    const response = await query;

    return response;
  }

  return {
    createCourse,
    getCourse,
    updateModule,
    updateEvalution,
    putCourse
  };
}

module.exports = courseRepo;
