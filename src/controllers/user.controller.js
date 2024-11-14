import User from "../models/User.js"; 

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const newUser = new User({
      name,
      email,
      password: await User.encryptPassword(password), 
    });

    
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
