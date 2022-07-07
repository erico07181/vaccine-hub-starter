const db = require("../db");
const { UnauthorizedError } = require("../utils/errors");
class User {
  static async login(credentials) {
    //Get the user's email
    //Get the user's name
    //Get the users password
    //Check if the user email is a valid user email
    //If yes,
    //Check if the password provied by the user matches the password in the database
    //If not
    //Error
    //else
    //login
    //If not,
    //Error
  }

  static async register(credentials) {
    //Get users name
    //Get users username and check if there is no same username in db
    //Get users email and check if there is no same email in db
    //Ask for a password
    //Hash password
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new UnauthorizedError(`Missin ${field} in request body`);
      }
    });

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new UnauthorizedError(`User already exists: ${credentials.email}`);
    }

    const lowercasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `
    INSERT INTO users(
        first_name,
        last_name,
        email,
        location,
        password
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id,first_name,last_name,email,location,date;
    `,
      [
        credentials.first_name,
        credentials.last_name,
        lowercasedEmail,
        credentials.location,
        hashedPassword,
      ]
    );
    const user = result.rows[0];
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new UnauthorizedError("No email provided");
    }

    const query = `SELECT * FROM users WHERE email = $1`;

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }
}
