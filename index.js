const express = require('express');
const sequelize = require('./src/config/database');
// ROTAS
const vacinacaoRoutes = require('./src/routes/vacinacaoRouter');
const vacinaRoutes = require('./src/routes/vacinaRouter');
const userRoutes = require('./src/routes/userRouter');
const local_vacinacaoRoutes = require('./src/routes/local_vacinacaoRouter');

const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use('/vacinacao', vacinacaoRoutes);
app.use('/vacina', vacinaRoutes);
app.use('/users', userRoutes);
app.use('/local_vacinacao', local_vacinacaoRoutes);


sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });