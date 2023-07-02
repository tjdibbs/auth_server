// password encryption and verification using bcrypt library

const bcrypt = require("bcrypt");
const CustomError = require("./customError");
const salt = 10;

/**
 * hash registered user provided password
 * @param {string} password
 * @returns {Promise<string>}
 */
exports.hashPassword = async function hashPassword(password) {
  try {
    const hashSalt = await bcrypt.genSalt(salt);
    const hashed = await bcrypt.hash(String(password), hashSalt);

    return hashed;
  } catch (error) {
    console.error(error);
    throw new CustomError(error.message);
  }
};

/**
 * Compare body password with database password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
exports.verifyPassword = async function verifyPassword(
  password,
  hashedPassword
) {
  try {
    return bcrypt.compare(String(password), hashedPassword);
  } catch (error) {
    return false;
  }
};
