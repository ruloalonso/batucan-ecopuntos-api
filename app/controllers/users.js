const mongoose = require("mongoose");
const User = mongoose.model("User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const newUser = new User({ name });
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

module.exports = {
  getAllUsers,
  createUser
};
