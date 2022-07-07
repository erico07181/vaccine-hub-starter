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
  }
}
