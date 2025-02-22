import { Router } from "express";
import { signIn, signOut, signUP } from "../controllers/auth.controller.js";

const authRouter = Router(); // INITIALIZE ROUTER

authRouter.post("/sign-up", signUP);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
