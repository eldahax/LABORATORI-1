const userService = require("../cruds/userCrud");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const RefreshToken = db.RefreshToken;


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }


    const roles = user.Roles ? user.Roles.map(r => r.role_name) : [];

    const accessToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        roles: roles
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );



    

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path:"/",
      maxAge: 60 * 60 * 1000
    });

 
   
    res.json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        roles: roles
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const signup = async (req, res) => {
  try {
    const result = await userService.createUser(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
      req.body.password
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
 try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
};

const updateUser = async (req, res) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  res.json(updated);
};

const deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.json(result);
};





module.exports = {
  login,
  signup,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};