const router = require("express").Router();
const authRouter = require("./authRouter");

// doing this incase they other sub endpoint like transactions, history
router.use("/auth", authRouter);

module.exports = router;
