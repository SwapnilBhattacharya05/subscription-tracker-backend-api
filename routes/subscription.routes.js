import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions); // GET ALL SUBSCRIPTIONS

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET subscription" })
);
subscriptionRouter.post("/", authorize, createSubscription); // CREATE NEW SUBSCRIPTION

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE subscription" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE subscription" })
);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions); // GET SPECIFIC USER'S ALL SUBSCRIPTIONS

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL subscription" })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
