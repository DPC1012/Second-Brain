import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { SignupSchema } from "../validation";
import bcrypt from "bcrypt";
import { User } from "../models/User.model";
import { connect_db } from "../db";
const UserRoute = express.Router();
connect_db();

UserRoute.post("/signup", async (req, res) => {
  const result = SignupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({
      message: "Please enter the correct inputs",
    });
  }

  const { username, password } = result.data;

  const UserExist = await User.findOne({
    username: username,
  });

  if (UserExist) {
    return res.status(403).json({
      message: "User already exists with this username",
    });
  }

  try {
    const HashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: HashedPassword,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    return res.status(200).json({
      message: "User created successfully",
      token,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

UserRoute.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const UserExist = await User.findOne({
      username,
    });

    if (!UserExist) {
      return res.status(403).json({
        message: "User doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      UserExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: UserExist._id }, JWT_SECRET);

    return res.json({ token });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default UserRoute;
