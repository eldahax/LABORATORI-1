const {
    Review,
    Patient,
    User,
    Treatment,
    sequelize,
} = require("../models/index");

const create = async (
    treatment_id,
    rating,
    description,
    email
) => {
    const t = await sequelize.transaction();

    try {

        const userExist = await User.findOne({
            where: { email },
            include: [Patient],
            transaction: t,
        });

        if (!userExist || !userExist.Patient)
            throw new Error("Patient profile not found");

        const patientId = userExist.Patient.patient_id;


        const treatmentRecord = await Treatment.findByPk(
            treatment_id,
            { transaction: t }
        );

        if (!treatmentRecord)
            throw new Error("This treatment doesn't exist");


        if (rating < 1 || rating > 5)
            throw new Error("Rating must be between 1 and 5");


        const existingReview = await Review.findOne({
            where: {
                patient_id: patientId,
                treatment_id,
            },
            transaction: t,
        });

        if (existingReview)
            throw new Error("You already reviewed this treatment");


        const newReview = await Review.create(
            {
                patient_id: patientId,
                treatment_id: Number(treatment_id),
                rating: Number(rating),
                description,
            },
            { transaction: t }
        );

        await t.commit();
        return newReview;

    } catch (err) {

        if (t) await t.rollback();
        throw new Error(err.message);
    }
};

const getAllReview = async (user) => {
    try {

        let whereCondition = {};
        const roles = user.roles || [];


        if (!roles.includes("admin")) {

            if (roles.includes("patient")) {
                whereCondition.patient_id = user.patient_id;
            }
        }

        return await Review.findAll({
            where: whereCondition,

            include: [
                {
                    model: Patient,
                    include: [
                        {
                            model: User,
                            attributes: ["first_name", "last_name"],
                        },
                    ],
                },

                {
                    model: Treatment,
                    attributes: ["treatment_name"],
                },
            ],

            order: [["created_at", "DESC"]],
        });

    } catch (err) {

        throw new Error(
            "Could not fetch reviews: " + err.message
        );
    }
};

const deleteReview = async (review_id) => {
    const t = await sequelize.transaction();

    try {

        const reviewExist = await Review.findByPk(
            review_id
        );

        if (!reviewExist)
            throw new Error("This review doesn't exist");

        await reviewExist.destroy({
            transaction: t,
        });

        await t.commit();

        return {
            message: "Review deleted successfully",
        };

    } catch (err) {

        if (t) await t.rollback();

        throw new Error(
            "Could not delete review: " + err.message
        );
    }
};

const getReviewById = async (review_id) => {
    try {

        const review = await Review.findByPk(
            review_id,
            {
                include: [
                    {
                        model: Patient,
                        include: [User],
                    },

                    {
                        model: Treatment,
                    },
                ],
            }
        );

        if (!review)
            throw new Error("Review not found");

        return review;

    } catch (err) {

        throw new Error(err.message);
    }
};

module.exports = {
    create,
    getAllReview,
    deleteReview,
    getReviewById,
};