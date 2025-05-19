const { logQuery } = require("../../commons/helpers");

function courseEvaluationRepo(fastify) {
    async function createCourseEvaluation({ data, logTrace }) {
        const knex = this;

        const query = knex("course_evaluation").insert({
            course_id: data.course_id,
            user_id: data.user_id,
            evaluation: JSON.stringify(data.evaluation),
            completed_at: data.completed_at,
            status: data.status
        });

        logQuery({
            logger: fastify.log,
            query,
            context: "Course Evaluation",
            logTrace
        });

        const response = await query;
        return response;
    }

    async function getCourseEvaluationUserID({ data, logTrace }) {
        const knex = this;

        const query = knex
            .select(
                "c.course_id",
                "c.user_id",
                "c.evaluation",
                "c.completed_at",
                "c.status"
            )
            .from("course_evaluation as c")
            .where({ user_id: data.user_id });

        logQuery({
            logger: fastify.log,
            query,
            context: "Get Course Evaluation",
            logTrace
        });

        const response = await query;

        return response;
    }

    async function getCourseEvaluationUserCourseID({ data, logTrace }) {
        const knex = this;

        const query = knex
            .select(
                "c.course_id",
                "c.user_id",
                "c.evaluation",
                "c.completed_at",
                "c.status"
            )
            .from("course_evaluation as c")
            .where({ user_id: data.user_id })
            .where({ course_id: data.course_id });

        logQuery({
            logger: fastify.log,
            query,
            context: "Get Course Evaluation",
            logTrace
        });

        const response = await query;

        return response;
    }

    return {
        createCourseEvaluation,
        getCourseEvaluationUserID,
        getCourseEvaluationUserCourseID
    };
}

module.exports = courseEvaluationRepo;
