const Sequelize = require ('sequelize'); //importando módulo

const connection = new Sequelize('LAB4', 'root', 'bel78477847', {
    host: 'localhost', 
    dialect: 'mysql' ,
    timezone: "-03:00"
});

module.exports = connection;