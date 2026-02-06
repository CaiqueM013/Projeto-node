//importações
require('dotenv').config()
const express = require('express')
const sequelize = require('./src/connection/db')
const userRoutes = require('./src/routes/userCRoutes')
const authRoutes = require('./src/routes/authRoutes')

const app = express()
app.use(express.json())


sequelize.sync().then(() => {
    console.log("Banco sincronizado com sucesso");
}).catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
});

app.use('/api', userRoutes)
app.use('/api', authRoutes)

sequelize.sync({ alter: true })
    .then(() => console.log("Banco sincronizado!"))
    .catch(err => console.error("Erro ao sincronizar o banco:", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});