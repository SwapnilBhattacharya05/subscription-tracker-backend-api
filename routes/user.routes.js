import { Router } from "express";

const userRouter = Router();

// GET /users -> GET ALL USERS
// GET /users/:id -> GET SPECIFIC USER BY ID // 3456rtfcvguhiuyest

userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));

userRouter.get("/:id", (req, res) => res.send({ title: "GET user details" })); // GET SPECIFIC USER

userRouter.post("/", (req, res) => res.send({ title: "CREATE new users" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));


export default userRouter;