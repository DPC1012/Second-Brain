import express from "express";
import { connect_db } from "../db";
import { ContentMiddleware } from "../middleware/ContentMiddleware";
import { Link } from "../models/Share.model";
import { random } from "../utils/random";
import { Content } from "../models/Content.model";
import { User } from "../models/User.model";
const ShareRoute = express.Router();
connect_db();

ShareRoute.post("/share", ContentMiddleware, async (req, res) => {
  const { share } = req.body;

  try {
    if (share) {
      const existingLink = await Link.findOne({
        userId: req.userId,
      });

      if (existingLink) {
        return res.json({
          hash: existingLink.hash,
        });
      }
      const hash = random(20);
      await Link.create({
        userId: req.userId,
        hash: hash,
      });

      return res.json({
        message: `/share/${hash}`,
      });
    } else {
      await Link.deleteMany({
        userId: req.userId,
      });

      return res.json({
        message: "Removed the link",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      e,
    });
  }
});

ShareRoute.get("/share/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  try {
    const LinkExist = await Link.findOne({
      hash,
    });

    if (!LinkExist) {
      return res.status(404).json({
        message: "Link is invalid or sharing is disabled",
      });
    } else {
      const content = await Content.find({
        userId: LinkExist.userId,
      });

      const user = await User.findOne({
        _id: LinkExist.userId,
      });

      if (!user) {
        return res.status(411).json({
          message: "User not found, error should ideally not be happen",
        });
      }

      return res.json({
        username: user.username,
        content: content,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default ShareRoute;
