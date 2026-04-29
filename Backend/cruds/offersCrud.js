const { Offer, Treatment, OfferTreatment } = require("../models");

const addOffer = async (offers_name, price, start_date, end_date, treatment_ids) => {

    const offer = await Offer.create({
        offers_name,
        price,
        start_date,
        end_date
    });

    if (Array.isArray(treatment_ids) && treatment_ids.length > 0) {
        const rows = treatment_ids.map(tid => ({
            offers_id: offer.offers_id,
            treatment_id: tid
        }));

        await OfferTreatment.bulkCreate(rows);
    }

    return await Offer.findByPk(offer.offers_id, {
        include: Treatment
    });
};


const getAllOffers = async () => {
    return await Offer.findAll({
        include: Treatment
    });
};


const getOfferById = async (id) => {
    const offer = await Offer.findByPk(id, {
        include: Treatment
    });

    if (!offer) throw new Error("Offer not found");

    return offer;
};


const updateOffer = async (offers_id, data) => {

    const offer = await Offer.findByPk(offers_id);
    if (!offer) throw new Error("Offer not found");

    await offer.update({
        offers_name: data.offers_name,
        price: data.price,
        start_date: data.start_date,
        end_date: data.end_date
    });

    await OfferTreatment.destroy({
        where: { offers_id }
    });

    if (Array.isArray(data.treatment_ids) && data.treatment_ids.length > 0) {
        const rows = data.treatment_ids.map(tid => ({
            offers_id,
            treatment_id: tid
        }));

        await OfferTreatment.bulkCreate(rows);
    }

    return await Offer.findByPk(offers_id, {
        include: Treatment
    });
};


const deleteOffer = async (offers_id) => {

    await OfferTreatment.destroy({ where: { offers_id } });

    const offer = await Offer.findByPk(offers_id);
    if (!offer) throw new Error("Offer not found");

    await offer.destroy();

    return { message: "Deleted" };
};

module.exports = {
    addOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer
};