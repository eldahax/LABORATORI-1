const {
    Review,
    Patient,
    User,
    Treatment,
    sequelize,
} = require("../models/index");

const create = async (treatment_id, rating, description) => {
    const t = await sequelize.transaction();

    try {
        const patientRecord = await Patient.findOne({
            include: [{ model: User }],
            transaction: t,
        });

        if (!patientRecord)
            throw new Error("No active patient profile found to associate with this review");

        const patientId = patientRecord.patient_id;

        const treatmentRecord = await Treatment.findByPk(treatment_id, { transaction: t });
        if (!treatmentRecord)
            throw new Error("The selected treatment does not exist");

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

const getAllReview = async () => {
    try {
        return await Review.findAll({
            include: [
                {
                    model: Patient,
                    include: [{ model: User, attributes: ["first_name", "last_name"] }],
                },
                {
                    model: Treatment,
                    attributes: ["treatment_name"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
    } catch (err) {
        throw new Error("Could not fetch reviews: " + err.message);
    }
};

const deleteReview = async (review_id) => {
    const t = await sequelize.transaction();
    try {
        const reviewExist = await Review.findByPk(review_id);
        if (!reviewExist) throw new Error("This review doesn't exist");

        await reviewExist.destroy({ transaction: t });

        await t.commit();
        return { message: "Review deleted successfully" };
    } catch (err) {
        if (t) await t.rollback();
        throw new Error("Could not delete review: " + err.message);
    }
};

const getReviewById = async (review_id) => {
    try {
        const review = await Review.findByPk(review_id, {
            include: [
                { model: Patient, include: [User] },
                { model: Treatment },
            ],
        });
        if (!review) throw new Error("Review not found");
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