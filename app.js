//importações
require('dotenv').config()
const express = require('express')
const sequelize = require('../connection/db')
const userRoutes = require('../routes/userCRoutes')

const app = express()
app.use(express.json())


equelize.sync().then(() => {
    console.log("Banco sincronizado com sucesso");
}).catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
});

app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});