const mongoose = require("mongoose");
const User = mongoose.model("User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "actions",
          localField: "_id",
          foreignField: "user",
          as: "actions",
        },
      },
      {
        $addFields: {
          points: { $sum: "$actions.points" },
        },
      },
      {
        $project: {
          actions: 0,
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const newUser = new User({ _id: new mongoose.Types.ObjectId(), name });
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
