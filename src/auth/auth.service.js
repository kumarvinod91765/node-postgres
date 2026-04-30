// const pool = require("../config/db");
// const jwt = require("jsonwebtoken");

// exports.login = async ({ email }) => {
//   const result = await pool.query(
//     "SELECT * FROM users WHERE email = $1",
//     [email]
//   );

//   if (!result.rows.length) {
//     throw new Error("User not found");
//   }

//   const user = result.rows[0];

//   const token = jwt.sign(
//     { id: user.id },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   return { user, token };
// };