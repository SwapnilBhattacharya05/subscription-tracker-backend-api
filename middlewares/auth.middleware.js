import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

/*
 * THIS MIDDLEWARE IS TRYING TO FIND THE USER BASED OFF THE TOKEN OF THE USER THAT IS TRYING TO MAKE THE REQUEST
 * IF THE USER IS THERE DECODES IT AND VERIFYING THAT IS THE USER CURRENTLY LOGGED IN
 * LATER ON WE CAN KNOW WHO EXACTLY IS MAKING THAT REQUEST
 */
export const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") // WHEN YOU PASS THE TOKEN WITH THE REQ HEADERS IT STARTS WITH WORD BEARER
    ) {
      token = req.headers.authorization.split(" ")[1]; // GET THE TOKEN FROM THE HEADERS
    }

    // IF THERE IS NO TOKEN
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // IF THERE IS A TOKEN VERIFY THE TOKEN
    const decoded = jwt.verify(token, JWT_SECRET);

    // CHECK IF USER STILL EXISTS
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized" }); // IF USER DOESN'T EXIST

    if (req.params.id && req.params.id !== decoded.userId)
      return res.status(401).json({ message: "Unauthorized" }); // IF USER ID DOESN'T MATCH THE USER ID IN THE TOKEN

    // IF IT DOES EXISTS
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export const adminAuthorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
