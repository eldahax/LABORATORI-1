const reminderService = require("../cruds/reminderCrud");

const successResponse = (
  res,
  statusCode,
  message,
  data = null,
  extra = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};


const createReminder = async (req, res) => {
  try {
    const reminder = await reminderService.createReminder(req.body);

    return successResponse(
      res,
      201,
      "Reminder created successfully",
      reminder
    );
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const result = await reminderService.confirmAppointment(req.params.id);

    return successResponse(
      res,
      200,
      "Appointment confirmed successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

const getAllReminders = async (req, res) => {
  try {
    const reminders = await reminderService.getAllReminders(req.user);

    return successResponse(
      res,
      200,
      "Reminders fetched successfully",
      reminders
    );
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

const getReminderById = async (req, res) => {
  try {
    const reminder = await reminderService.getReminderById(req.params.id);

    return successResponse(
      res,
      200,
      "Reminder fetched successfully",
      reminder
    );
  } catch (err) {
    return errorResponse(res, 404, err.message);
  }
};

const updateReminder = async (req, res) => {
  try {
    const updatedReminder = await reminderService.updateReminder(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      200,
      "Reminder updated successfully",
      updatedReminder
    );
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};


const deleteReminder = async (req, res) => {
  try {
    const result = await reminderService.deleteReminder(req.params.id);

    return successResponse(res, 200, result.message);
  } catch (err) {
    return errorResponse(res, 404, err.message);
  }
};

const markAsSent = async (req, res) => {
  try {
    const reminder = await reminderService.markAsSent(req.params.id);

    return successResponse(res, 200, "Reminder marked as sent", reminder);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

module.exports = {
  createReminder,
  confirmAppointment,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  markAsSent,
};