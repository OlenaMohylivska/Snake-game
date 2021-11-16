const database = require("../db");

const getUsers = async (req: any, res: any) => {
   console.log('work');
  const allUsers = await database.query("SELECT * FROM users");
  res.json(allUsers.rows);
};

const createUser = async (req: any, res: any) => {
  const { first_name, last_name } = req.body;  
  const newUser = await database.query(
    'INSERT INTO users (first_name, last_name, best_score) values ($1, $2, $3) RETURNING *',
    [first_name, last_name, 0]
  );  
  res.json(newUser.rows[0]);
};

const getUserById = async (req: any, res: any) => {
  const { id } = req.query;  
  const user = await database.query(
    'SELECT * FROM users WHERE user_id = $1', [id]);
  res.json(user.rows[0]);
};

const updateUserScore = async (req: any, res: any) => {
  const { user_id, best_score } = req.body;
  const newScore = await database.query(
    'UPDATE users SET best_score= $1 WHERE user_id= $2 RETURNING *;', [best_score, user_id]
  );
  res.json(newScore.rows[0]);
};

const getStatistic = async (req: any, res: any) => {
  const { id } = req.query;
  const statistic = await database.query(
    `SELECT game_id, date, score, time, users.user_id 
      FROM statistic
      INNER JOIN users ON statistic.fk_user_id = users.user_id
      WHERE user_id = $1`, [id]
  );  
  res.json(statistic.rows);
}

const createStatistic = async (req: any, res: any) => {
  const { date, score, time, user_id } = req.body;  
  const newStatistic = await database.query(
    'INSERT INTO statistic (date, score, time, fk_user_id) values ($1, $2, $3, $4) RETURNING *',
    [date, score, time, user_id]
  );  
  res.json(newStatistic.rows[0]);
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserScore,
  getStatistic,
  createStatistic,
};
