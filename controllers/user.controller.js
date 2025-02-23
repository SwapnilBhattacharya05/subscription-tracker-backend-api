import User from "../models/user.model.js";

// GET ALL THE USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// GET SPECIFIC USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // EXCLUDE PASSWORD

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
