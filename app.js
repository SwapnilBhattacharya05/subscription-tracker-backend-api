import express from "express";
import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express(); // INITIALIZE EXPRESS

app.use(express.json()); // HANDLE JSON DATA SENT IN REQUEST
app.use(express.urlencoded({ extended: false })); // HELPS TO PROCESS FORM DATA SEND VIA HTML FORMS IN SIMPLE FORMAT
app.use(cookieParser()); // READS COOKIES FROM INCOMING REQUESTS SO YOUR APP CAN STORE USER DATA

// .use() -> MIDDLEWARE
app.use("/api/v1/auth", authRouter); // -> api/v1/auth/sign-up
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// ERROR MIDDLEWARE
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API running on port http://localhost:${PORT}`
  );
  await connectToDatabase();
});

export default app;
