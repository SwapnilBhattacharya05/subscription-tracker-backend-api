import mongoose from "mongoose";
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUP = async (req, res, next) => {
  const session = await mongoose.startSession(); // IT'S A SESSION OF A MONGOOSE TRANSACTION
  session.startTransaction(); // PERFORM ATOMIC UPDATES/OPERATIONS -> ONLY COMMIT IF ALL OPERATIONS SUCCEEDS

  try {
    // LOGIC TO CREATE NEW USER
    const { name, email, password } = req.body;
    // CHECK IF USER ALREADY EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    // HASH PASSWORD IF USER DOESN'T ALREADY EXISTS
    const salt = await bcrypt.genSalt(10); // SALT => RANDOM STRING

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session } // PERFORM ATOMIC UPDATES/OPERATIONS SINCE SOMETHING COULD GO WRONG WHEN CREATING THIS USER
    );

    const token = jwt.sign(
      {
        userId: newUsers[0]._id, // [0] BECAUSE NEW USER IS AN ARRAY OF OBJECTS AND GET THE FIRST OBJECT
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    await session.commitTransaction(); // COMMIT TRANSACTION IF ALL OPERATIONS SUCCEEDS
    session.endSession(); // END SESSION
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction(); // ROLLBACK TRANSACTION IF ERROR
    session.endSession(); // END SESSION
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // IF USER DOESN'T EXIST
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    // IF USER EXISTS
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
