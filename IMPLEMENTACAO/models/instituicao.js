const Sequelize = require ("sequelize");
const connection = require("../database/database");

Instituicao = connection.define('instituicao', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

//vai criar a tabela se não existir. Se existir, não vai forçar a criação
Instituicao.sync({force: false}).then(() => {}); 

module.exports = Instituicao;