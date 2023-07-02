const authRouter = require("express").Router();
const { Users } = require("../models");
const CustomError = require("../lib/customError");
const { hashPassword, verifyPassword } = require("../lib/crypto");
const _ = require("lodash");

// root directory
authRouter.get("/", (req, res) => res.send("A call to auth router"));

// sign in user
/**
 * @requiredFields {{ password, email }}
 */
authRouter.post("/sign-in", async (req, res, next) => {
  try {
    const body = req.body;

    // checking if it's not bad request
    if (!body.password || !body.email)
      throw new CustomError("Incomplete Fields", 400);

    // get user with the credentials from database
    let user = await Users.findOne({ email: body.email }).lean();

    if (!user) {
      throw new CustomError("User doesn't exist", 404);
    }

    // compare password with database password
    if (!verifyPassword(body.password, user.password)) {
      throw new CustomError("Invalid credentials", 401);
    }

    // we need to remove some fields from the object with lodash
    res.json({
      success: true,
      user: _.omit(user, ["password", "__v", "updatedAt"]),
    });
  } catch (error) {
    console.error(error);

    let errorObject = new CustomError(
      error.message ?? "Internal Server Error",
      error.statusCode ?? 500
    );

    res.status(error.statusCode ?? 500).json(errorObject);
  }
});

authRouter.post("/sign-up", async (req, res, next) => {
  try {
    const body = req.body;

    // required field to be provided for account to be create

    /**
     * @typedef {{firstName: string, lastName: string; password: string, email: string}} User
     */

    // validate that all field are present
    if (!body.firstName || !body.lastName || !body.password || !body.email) {
      throw new Error("Incomplete fields");
    }

    // let store in database
    const newUser = Users({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,

      // we will encrypt our password later
      password: await hashPassword(body.password),
    });

    await newUser.save();

    // using created status
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    let errorObject = new CustomError(
      error.message ?? "Internal Server Error",
      500
    );

    res.status(500).json(errorObject);
  }
});

module.exports = authRouter;
