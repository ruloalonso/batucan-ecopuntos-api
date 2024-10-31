const mongoose = require("mongoose");
const ActionType = mongoose.model("ActionType");

const getAllActionTypes = async (req, res) => {
  try {
    const actions = await ActionType.find();
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los tipos de acciones", error });
  }
};

const createActionType = async (req, res) => {
  try {
    const { description, points } = req.body;

    if (!description || !points) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const newActionType = new ActionType({
      _id: new mongoose.Types.ObjectId(),
      description,
      points,
    });

    const savedActionType = await newActionType.save();

    res.status(200).json(savedActionType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el tipo de acción", error });
  }
};

module.exports = {
  getAllActionTypes,
  createActionType,
};
