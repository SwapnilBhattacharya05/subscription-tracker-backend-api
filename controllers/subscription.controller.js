import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

// CREATE NEW SUBSCRIPTION
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
};

// GET SPECIFIC USER'S SUBSCRIPTIONS
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      const error = new Error("You can only get your own subscriptions");
      error.statusCode = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

// GET ALL SUBSCRIPTIONS
export const getAllSubscriptions = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
    }
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
