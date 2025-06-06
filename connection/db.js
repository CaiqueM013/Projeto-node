const Sequelize = require('sequelize');


if(process.env.ENVIRONMENT === "system"){
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
            dialect: 'postgres',
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
        }
    );
    module.exports = sequelize;
} else {
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
            dialect: 'postgres',
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
        }
    );
    module.exports = sequelize;
}
