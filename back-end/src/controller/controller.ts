const database = require("../db");

const getUsers = async (req: any, res: any) => {
  const allUsers = await database.query("SELECT * FROM users");
  res.json(allUsers.rows);
};

const createUser = async (req: any, res: any) => {
  const { first_name, last_name } = req.body;
  const newUser = await database.query(
    "INSERT INTO users (first_name, last_name, best_score) values ($1, $2, $3) RETURNING *",
    [first_name, last_name, 0]
  );
  res.json(newUser.rows[0]);
};

const getUserByName = async (req: any, res: any) => {
  const { first, last } = req.query;
  const user = await database.query(
    `SELECT * FROM users WHERE first_name='${first}' AND last_name='${last}';`
  );
  res.json(user.rows[0]);
};

const updateUserScore = async (req: any, res: any) => {
  const { first_name, last_name, best_score } = req.body;
  const newScore = await database.query(
    `UPDATE users SET best_score=${best_score} WHERE first_name='${first_name}' AND last_name='${last_name}' RETURNING *;`
  );
  res.json(newScore.rows[0]);
};

module.exports = {
  getUsers,
  createUser,
  getUserByName,
  updateUserScore,
};

// const getUserScore = async (req: any, res: any) => {
//   const { first_name, last_name, score } = req.body;
//   const userScore = await database.query(
//     `SELECT best_score From users
//       WHERE users.first_name = ${first_name}
//       and users.last_name = ${last_name}`
//   );
//   res.json(userScore.rows[0]);
// };


