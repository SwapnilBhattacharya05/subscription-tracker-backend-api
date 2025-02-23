import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { adminAuthorize, authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET /users -> GET ALL USERS
// GET /users/:id -> GET SPECIFIC USER BY ID // 3456rtfcvguhiuyest

userRouter.get("/", adminAuthorize, getUsers);

userRouter.get("/:id", authorize, getUser); // GET SPECIFIC USER

userRouter.post("/", (req, res) => res.send({ title: "CREATE new users" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
