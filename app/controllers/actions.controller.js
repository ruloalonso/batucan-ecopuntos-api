const mongoose = require("mongoose");
const Action = mongoose.model("Action");

const getAllActions = async (req, res) => {
  try {
    const actions = await Action.find().populate("user");
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las acciones", error });
  }
};

const createAction = async (req, res) => {
  try {
    const { userId, date, description, points } = req.body;

    if (!userId || !date || !description || !points) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const newAction = new Action({
      user: userId,
      date,
      description,
      points,
    });

    const savedAction = await newAction.save();

    const populatedAction = await Action.findById(savedAction._id).populate(
      "user"
    );

    res.status(200).json(populatedAction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la acción", error });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAction = await Action.findByIdAndDelete(id);

    if (!deletedAction) {
      return res.status(404).json({ message: "Accion no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Acción eliminada correctamente", deletedAction });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la acción", error });
  }
};

// Vacía la colección de acciones (p. ej. al empezar un curso nuevo).
// Antes de borrar, copia todas las acciones a "actionsarchive" para no perderlas.
const resetActions = async (req, res) => {
  try {
    const label = String(req.body?.label || "").trim();
    const archivedAt = new Date();

    const actions = await Action.find().lean();

    if (actions.length > 0) {
      const archive = mongoose.connection.collection("actionsarchive");
      await archive.insertMany(
        actions.map(({ _id, ...action }) => ({
          ...action,
          originalId: _id,
          label,
          archivedAt,
        }))
      );
    }

    const { deletedCount } = await Action.deleteMany({
      _id: { $in: actions.map((action) => action._id) },
    });

    res.status(200).json({
      message: "Acciones archivadas y eliminadas correctamente",
      archived: actions.length,
      deleted: deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al vaciar las acciones", error });
  }
};

module.exports = {
  getAllActions,
  createAction,
  deleteById,
  resetActions,
};
