const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      date: user.date,
    };
  }
  static async login(credentials) {
    const requiredFields = ["email", "password"];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  static async register(credentials) {
    //user should submit their email and pw
    //If any of these fields are missing, throw an error
    const requiredFields = [
      "first_name",
      "last_name",
      "location",
      "email",
      "password",
      "date",
    ];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body...`);
      }
    });

    //make sure no user already exists in the database with that email
    //if one does, throw an error
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError("Duplicate email: ", credentials.email);
    }
    //take the user's password and hash it
    //take hte user's email and lowercase it
    const lowercasedEmail = credentials.email.toLowerCase();
    //create a new user with in the db with their info
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `
    INSERT INTO users(
        first_name,
        last_name,
        email,
        location,
        password,
        date
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id,first_name,last_name,email,location,date;
    `,
      [
        credentials.first_name,
        credentials.last_name,
        lowercasedEmail,
        credentials.location,
        hashedPassword,
        credentials.date,
      ]
    );
    //return the user
    const user = result.rows[0];
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
