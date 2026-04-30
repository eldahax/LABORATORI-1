const roomService = require("../cruds/roomCrud");

const createRoom = async (req, res) => {
    try {
        const { room_name, chair_number, department_name } = req.body;

        const result = await roomService.createRoom(
            room_name,
            chair_number,
            department_name
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const result = await roomService.updateRoom(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const result = await roomService.getAllRooms();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRoomById = async (req, res) => {
    try {
        const result = await roomService.getRoomById(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: "Room not found" });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const result = await roomService.deleteRoom(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRoom,
    updateRoom,
    getAllRooms,
    getRoomById,
    deleteRoom,
};