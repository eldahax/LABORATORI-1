const {
    Payment,
    Invoice,
    Appointment,
    Doctor,
    Patient,
    PatientTreatment,
    Treatment,
    User
} = require("../models/index");

const getAllPayments = async () => {
    try {
        return await Payment.findAll({
            include: [
                {
                    model: Invoice,
                    include: [
                        {
                            model: Appointment,
                            include: [
                                {
                                    model: Doctor,
                                    include: [User],
                                },
                                {
                                    model: Patient,
                                    include: [User],
                                },
                                {
                                    model: PatientTreatment,
                                    include: [Treatment],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [["payment_date", "DESC"]],
        });
    } catch (err) {
        throw new Error("Could not fetch payments: " + err.message);
    }
};

const getPaymentById = async (payment_id) => {
    try {
        const payment = await Payment.findByPk(payment_id, {
            include: [
                {
                    model: Invoice,
                    include: [Appointment],
                },
            ],
        });

        if (!payment) throw new Error("Payment not found");

        return payment;
    } catch (err) {
        throw new Error(err.message);
    }
};


const getPaymentsByInvoice = async (invoice_id) => {
    try {
        return await Payment.findAll({
            where: { invoice_id },
            order: [["payment_date", "DESC"]],
        });
    } catch (err) {
        throw new Error("Could not fetch invoice payments: " + err.message);
    }
};

module.exports = {
    getAllPayments,
    getPaymentById,
    getPaymentsByInvoice,
};
