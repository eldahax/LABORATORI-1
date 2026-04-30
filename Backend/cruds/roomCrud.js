const { Room, Department } = require("../models");

const createRoom = async (room_name, chair_number, department_name) => {
    try {
        const department = await Department.findOne({
            where: { department_name }
        });

        if (!department) throw new Error("Department not found");

        const room = await Room.create({
            room_name,
            chair_number: Number(chair_number),
            department_id: department.department_id
        });

        return { message: "Room created successfully", room };

    } catch (err) {
        throw err;
    }
};

const getAllRooms = async () => {
    return await Room.findAll({
        include: [
            {
                model: Department,
                attributes: ["department_name"]
            }
        ]
    });
};

const getRoomById = async (id) => {
    const room = await Room.findByPk(id, {
        include: [
            {
                model: Department,
                attributes: ["department_name"]
            }
        ]
    });

    if (!room) throw new Error("Room not found");

    return room;
};

const updateRoom = async (id, data) => {
    const room = await Room.findByPk(id);
    if (!room) throw new Error("Room not found");

    let department_id = room.department_id;

    if (data.department_name) {
        const department = await Department.findOne({
            where: { department_name: data.department_name }
        });

        if (!department) throw new Error("Department not found");

        department_id = department.department_id;
    }

    await room.update({
        room_name: data.room_name,
        chair_number: data.chair_number,
        department_id
    });

    return { message: "Room updated" };
};

const deleteRoom = async (id) => {
    const room = await Room.findByPk(id);
    if (!room) throw new Error("Room not found");

    await Room.destroy({
        where: { room_id: id }
    });

    return { message: "Room deleted" };
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
};