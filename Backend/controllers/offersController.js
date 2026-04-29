const offerService = require("../cruds/offersCrud");

const addOffer = async (req, res) => {
    try {
        const { offers_name, price, start_date, end_date, treatment_ids } = req.body;

        const offer = await offerService.addOffer(
            offers_name,
            price,
            start_date,
            end_date,
            treatment_ids
        );

        res.json(offer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllOffers = async (req, res) => {
    try {
        const offers = await offerService.getAllOffers();
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOfferById = async (req, res) => {
    try {
        const offer = await offerService.getOfferById(req.params.id);
        res.json(offer);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const updated = await offerService.updateOffer(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const result = await offerService.deleteOffer(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

module.exports = {
    addOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer
};