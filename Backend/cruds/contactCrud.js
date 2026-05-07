const { Contact } = require("../models");

const createContact = async (
    fullname,
    email,
    phone_number,
    message
) => {
    try {
        await Contact.create({
            fullname,
            email,
            phone_number,
            message
        });

        return { message: "Contact created successfully" };

    } catch (err) {
        throw err;
    }
};

const readallContacts = async () => {
    return await Contact.findAll({
        attributes: [
            "contact_id",
            "fullname",
            "email",
            "phone_number",
            "message"
        ]
    });
};

const getId = async (id) => {
    const contact = await Contact.findByPk(id);

    if (!contact) {
        throw new Error("Contact not found");
    }

    return contact;
};

const updateContact = async (id, data) => {
    const contact = await Contact.findByPk(id);

    if (!contact) {
        throw new Error("Contact not found");
    }

    await contact.update({
        fullname: data.fullname,
        email: data.email,
        phone_number: data.phone_number,
        message: data.message
    });

    return { message: "Contact updated" };
};

const deleteContact = async (id) => {
    const contact = await Contact.findByPk(id);

    if (!contact) {
        throw new Error("Contact not found");
    }

    await Contact.destroy({
        where: { contact_id: contact.contact_id }
    });

    return { message: "Contact deleted" };
};

module.exports = {
    createContact,
    readallContacts,
    getId,
    updateContact,
    deleteContact
};