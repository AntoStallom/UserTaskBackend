const User = require("../model/user");
const bookidgen = require("bookidgen");
const jwt = require("jsonwebtoken");
const config = require("../config");

// post login admin
const postLoginAdmin = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "Enter email and password", status: false });
    } else {
      if (
        email.trim() === "AntoStallon23@gmail.com" &&
        password.trim() === "123456789"
      ) {
        const token = await jwt.sign(
          {
            admin: true,
            email,
          },
          config.JWT_TOKEN_KEY
        );
        res.json({ message: "Admin can login", status: true, token });
      } else {
        res.json({ message: "Ivalid credentials", status: false });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//add user(Post API)
const postUser = async (req, res, next) => {
  let { email, firstName, lastName, mobile, age } = req.body;
  try {
    if (!email || !firstName || !lastName || !mobile || !age) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const id = await bookidgen("User_", 100, 10000);
      const addData = await User({
        id,
        email,
        age,
        firstName,
        lastName,
        mobile,
      }).save();
      if (!addData) {
        res.json({ message: "User not added", status: false });
      } else {
        res.json({ message: "User added successfully", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//get all user list
const getAllUserList = async (req, res, next) => {
  try {
    const data = await User.find();
    if (!data) {
      res.json({ message: "User list nont found", status: false });
    } else {
      res.json({ message: "User list found", status: true, data: data });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//patch user
const patchUser = async (req, res, next) => {
  let { id, email, firstName, lastName, mobile, age } = req.body;
  try {
    if (!id || !email || !firstName || !lastName || !mobile || !age) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const update = await User.findOneAndUpdate(
        { id: id },
        {
          $set: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            age: age,
          },
        },
        {
          new: true,
        }
      );
      if (!update) {
        res.json({ message: "User not updated", status: false });
      } else {
        res.json({ message: "User updated successfully", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    if (!id) {
      res.json({ message: "Enter id", status: false });
    } else {
      const remove = await User.findOneAndRemove({ id: id });
      if (!remove) {
        res.json({ message: "User not deleted", status: false });
      } else {
        res.json({ message: "User deleted", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

module.exports = {
  postLoginAdmin,
  postUser,
  getAllUserList,
  patchUser,
  deleteUser,
};
