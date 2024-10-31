const mongoose = require("mongoose");
const Action = mongoose.model("Action");

const getAllActions = async (req, res) => {
  try {
    const actions = await Action.find().populate("user").populate("type");
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las acciones", error });
  }
};

const createAction = async (req, res) => {
  try {
    const { userId, date, actionTypeId } = req.body;

    if (!userId || !date || !actionTypeId) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const newAction = new Action({
      date: date,
      user: userId,
      type: actionTypeId,
    });

    const savedAction = await newAction.save();

    const populatedAction = await Action.findById(savedAction._id)
      .populate("user")
      .populate("type");

    res.status(200).json(populatedAction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la acción", error });
  }
};

module.exports = {
  getAllActions,
  createAction,
};
