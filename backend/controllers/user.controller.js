import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.send("Test is successfull !!!");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update only Your account"));

  try {
    if (req.user.password) {
      req.user.password = bcryptjs.hashSync(req.user.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          // this set method is used for checking which value is changed
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own Account"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("Token");
    res.status(200).json("User Account has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User Not Found!!"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
