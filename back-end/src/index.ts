const express = require("express");
const usersRoutes = require('./routes/routes');
const PORT = process.env.PORT || 3001;

const app = express(usersRoutes);
const users = ["Elie", "Matt", "Joel", "Michael"];
app.use(express.json());
app.use('/api', usersRoutes);

app.get("/", (req: any, res: any) => {
  return res.json(users);
});

app.get("/helloworld", (req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
