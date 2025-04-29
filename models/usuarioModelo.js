const { DataTypes } = require('sequelize');
const db = require('../connection/db');

const Usuario = db.define('pessoa' , {
    id :{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true , 
        primaryKey: true
    },
    email :{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    datanasc :{
        type : Sequelize.DataTypes.DATE,
        allowNull: false,
    },
    senha :{
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    cep :{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false, 
    },
    tipoUsuario : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
});

Usuario.checkEmailExists = async (email) => {
    const user = await Usuario.findOne({ where: { email } });
    return !!user;
  };
  
  // Método para criar novo usuário
  Usuario.createUser = async ({ email, senha, datanasc, cep, tipoUsuario }) => {
    return Usuario.create({ email, senha, datanasc, cep, tipoUsuario });
  };  

module.exports = usuario;