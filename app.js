import express from "express";
import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express(); // INITIALIZE EXPRESS

// .use() -> MIDDLEWARE

app.use("/api/v1/auth", authRouter); // -> api/v1/auth/sign-up
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Tracker API running on port http://localhost:${PORT}`
  );
});

export default app;
