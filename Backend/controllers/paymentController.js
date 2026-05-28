const paymentCrud = require("../cruds/paymentCrud");

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentCrud.getAllPayments();
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentCrud.getPaymentById(req.params.id);
        res.json(payment);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const getPaymentsByInvoice = async (req, res) => {
    try {
        const payments = await paymentCrud.getPaymentsByInvoice(req.params.invoiceId);
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllPayments,
    getPaymentById,
    getPaymentsByInvoice,
};
