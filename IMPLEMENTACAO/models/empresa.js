const Sequelize = require ("sequelize");
const connection = require("../database/database");

const Empresa = connection.define('empresa', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Empresa.sync({force: false}).then(() => {}); 

module.exports = Empresa;