import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Role.js";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 horas
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const verifyToken = (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    res.status(200).json({ message: "Token is valid" });
  });
};
