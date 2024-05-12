import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userRegistration(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword });

    res.status(201).send({ message: "Registration succesfully" });
  } catch (error) {
    next(error);
  }
}

export async function userLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      throw HttpError(401, "Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      throw HttpError(401, "Email or password is incorrect");
    }

    const userInfo = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
}

export async function userLogout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function userByToken(req, res, next) {
  const { id } = req.user;
  try {
    const currentUser = await User.findById(id);

    if (!currentUser) {
      throw HttpError(401);
    }
    res.status(200).send(currentUser);
  } catch (error) {
    next(error);
  }
}