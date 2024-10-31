const mongoose = require("mongoose");
const Action = mongoose.model("Action");

const getAllActions = async (req, res) => {
  try {
    const actions = await Action.find();
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

    res.status(200).json(savedAction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la acción", error });
  }
};

module.exports = {
  getAllActions,
  createAction,
};
