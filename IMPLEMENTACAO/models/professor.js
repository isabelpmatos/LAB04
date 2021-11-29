const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Professor = connection.define('professor', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    saldo:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Professor.sync({force: false}).then(() => {}); 

module.exports = Professor;