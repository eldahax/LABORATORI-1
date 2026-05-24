const crud = require("../cruds/reviewCrud");

const createReview = async (req, res) => {
    try {

        const {
            treatment_id,
            rating,
            description,
        } = req.body;

        const result = await crud.create(
            treatment_id,
            rating,
            description,
            req.user.email
        );

        res.json(result);

    } catch (err) {

        res.status(500).json({
            error: err.message,
        });
    }
};


const deleteReview = async (req, res) => {
    try {

        const del = await crud.deleteReview(
            req.params.id
        );

        res.json(del);

    } catch (err) {

        res.status(400).json({
            error: err.message,
        });
    }
};

const getAll = async (req, res) => {
    try {

        const all = await crud.getAllReview(
            req.user
        );

        res.json(all);

    } catch (err) {

        res.status(400).json({
            error: err.message,
        });
    }
};

const getById = async (req, res) => {
    try {

        const get = await crud.getReviewById(
            req.params.id
        );

        res.json(get);

    } catch (err) {

        res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = {
    createReview,
    deleteReview,
    getAll,
    getById,
};