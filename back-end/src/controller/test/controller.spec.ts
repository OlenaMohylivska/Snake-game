const controllers = require('../controller');
const db = require('../../db');

describe('Test getUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(controllers, 'getUsers').mockImplementation(async () => {
      const allUsers = await db.query('SELECT * FROM users');
      return allUsers;
    });
    jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve([]));
  });

  it('should call getUsers method and return []', async () => {
    const result = await controllers.getUsers();
    expect(controllers.getUsers).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM users');
    expect(result).toEqual([]);
  });
});

describe('Test createUser', () => {
  const first_name = 'Arthur';
  const last_name = 'Klingbeil';
  const query =
    'INSERT INTO users (first_name, last_name, best_score) values ($1, $2, $3) RETURNING *';
  const data = [first_name, last_name, 0];
  const expectedResult = `${first_name} ${last_name}`;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(controllers, 'createUser').mockImplementation(async () => {
      const newUser = await db.query(query, data);
      return newUser;
    });
    jest
      .spyOn(db, 'query')
      .mockImplementation(() => Promise.resolve(expectedResult));
  });

  it('should call createUser method and return []', async () => {
    const result = await controllers.createUser();
    expect(controllers.createUser).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(query, data);
    expect(result).toEqual(expectedResult);
  });
});

describe('Test getUserById', () => {
  const id = 1;
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const data = [id];
  const expectedResult = 'Arthur Klingbeil';
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(controllers, 'getUserById').mockImplementation(async () => {
      const user = await db.query(query, data);
      return user;
    });
    jest
      .spyOn(db, 'query')
      .mockImplementation(() => Promise.resolve(expectedResult));
  });

  it('should call getUserById method and return []', async () => {
    const result = await controllers.getUserById();
    expect(controllers.getUserById).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(query, data);
    expect(result).toEqual(expectedResult);
  });
});

describe('Test updateUserScore', () => {
  const id = 1;
  const score = 5;
  const query =
    'UPDATE users SET best_score= $1 WHERE user_id= $2 RETURNING *;';
  const data = [score, id];
  const expectedResult = `${score}`;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(controllers, 'updateUserScore').mockImplementation(async () => {
      const updatedUser = await db.query(query, data);
      return updatedUser;
    });
    jest
      .spyOn(db, 'query')
      .mockImplementation(() => Promise.resolve(expectedResult));
  });

  it('should call updateUserScore method and return []', async () => {
    const result = await controllers.updateUserScore();
    expect(controllers.updateUserScore).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(query, data);
    expect(result).toEqual(expectedResult);
  });
});

describe('Test getStatistic', () => {
  const id = 1;
  const query = `SELECT game_id, date, score, time, users.user_id 
  FROM statistic
  INNER JOIN users ON statistic.fk_user_id = users.user_id
  WHERE user_id = $1`;
  const data = [id];
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(controllers, 'getStatistic').mockImplementation(async () => {
      const newStatistic = await db.query(query, data);
      return newStatistic;
    });
    jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve([{}]));
  });

  it('should call getStatistic method and return []', async () => {
    const result = await controllers.getStatistic();
    expect(controllers.getStatistic).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(query, data);
    expect(result).toEqual([{}]);
  });
});

describe('Test createStatistic', () => {
  const date = '15/11/2021 11:56';
  const score = 5;
  const time = '00:44';
  const id = 1;
  const query = 'INSERT INTO statistic (date, score, time, fk_user_id) values ($1, $2, $3, $4) RETURNING *';
  const data = [date, score, time, id];
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(controllers, 'createStatistic').mockImplementation(async () => {
      const newStatistic = await db.query(query, data);
      return newStatistic;
    });
    jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve([{}]));
  });

  it('should call createStatistic method and return []', async () => {
    const result = await controllers.createStatistic();
    expect(controllers.createStatistic).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(query, data);
    expect(result).toEqual([{}]);
  });
});
