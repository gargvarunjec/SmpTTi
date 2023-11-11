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
        $set: {                          // this set method is used for checking which value is changed 
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true });

      const {password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);

    
  } catch (error) {
    next(error);
  }
};
