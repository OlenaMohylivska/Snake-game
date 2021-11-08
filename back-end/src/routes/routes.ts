const Router = require('express');
const controller = require('../controller/controller');
const router = Router();

router.get('/', (req: any, res: any) => {
  res.send('using api route')
});

router.get('/users', controller.getUsers);
router.post('/users', controller.createUser);
router.put('/user', controller.updateUserScore);
router.get('/user', controller.getUserByName);

module.exports = router;