const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Tipo = connection.define('tipo', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Tipo.sync({force: false}).then(() => {}); 

module.exports = Tipo;